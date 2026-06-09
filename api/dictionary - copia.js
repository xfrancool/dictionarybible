import fs from 'fs';
import path from 'path';

function normalize(text) {
	return text
		?.toString()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

const cache = {};

function loadFile(letter) {
	if (cache[letter]) return cache[letter];

	const filePath = path.join(process.cwd(), 'data', `${letter}.json`);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

	cache[letter] = data;

	return data;
}

function loadAllData() {
	const letters = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'y',
		'z'
	];

	const result = {};

	for (const letter of letters) {
		const data = loadFile(letter);

		if (data) {
			result[letter] = data;
		}
	}

	return result;
}

function searchAll(query) {
	const allData = loadAllData();
	const results = [];

	for (const letterData of Object.values(allData)) {
		const words = letterData.data || {};

		for (const [key, value] of Object.entries(words)) {
			const word = value.word || key;

			if (normalize(key).includes(query) || normalize(word).includes(query)) {
				results.push({
					word,
					...value
				});
			}
		}
	}

	return results;
}

export default function handler(req, res) {
	try {
		const { word, letter, search } = req.query;

		// SEARCH
		if (search) {
			const results = searchAll(normalize(search));

			return res.status(200).json({
				total: results.length,
				results
			});
		}

		// DICCIONARIO COMPLETO
		if (!word && !letter) {
			const allData = loadAllData();

			return res.status(200).json({
				totalLetters: Object.keys(allData).length,
				data: allData
			});
		}

		// LETRA
		if (letter) {
			const data = loadFile(normalize(letter));

			if (!data) {
				return res.status(404).json({
					error: 'Letra no encontrada'
				});
			}

			return res.status(200).json(data.data || {});
		}

		// PALABRA
		if (word) {
			const target = normalize(word);

			const allData = loadAllData();

			for (const letterData of Object.values(allData)) {
				const words = letterData.data || {};

				const foundKey = Object.keys(words).find(key => {
					const item = words[key];

					return (
						normalize(key) === target || normalize(item.word || '') === target
					);
				});

				if (foundKey) {
					return res.status(200).json(words[foundKey]);
				}
			}

			return res.status(404).json({
				error: 'Palabra no encontrada'
			});
		}

		return res.status(400).json({
			error: 'Solicitud inválida'
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			error: 'Error interno'
		});
	}
}
