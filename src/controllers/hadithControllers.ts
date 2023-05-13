import { RequestHandler } from "express";
import { hadithDB } from "../mongodb.js";
import { without_id } from "../helpers/remove_id.js";

const hadithsCol = hadithDB.collection("hadiths");

export const getHadithById: RequestHandler = async (req, res) => {
	const { id: ID } = req.params;
	const id = parseInt(ID as string);

	if (!id) {
		return res.status(409).json({
			message:
				"The id query is required and must be number. (e.g. /hadith/1 for the first hadith in the database). If you want to get a hadith by its number in a book, use /book/:id/hadith/:number (e.g. /book/1/hadith/1 for the first hadith in Sahih Bukhari).",
		});
	}

	const hadith = await hadithsCol.findOne({ id });

	if (!hadith) {
		const hadithsCount = await hadithsCol.countDocuments();

		return res.status(404).json({
			message: `There is no hadith with id ${id}. Try a vaild id from 1 - ${hadithsCount}`,
		});
	}

	return res.status(200).json(without_id(hadith));
};

export const getHadithByBookIdAndId: RequestHandler = async (req, res) => {
	const { bookId: BOOK_ID, id: ID } = req.params;

	const [bookId, id] = [BOOK_ID, ID].map((x) => parseInt(x));

	if (!bookId || !id) {
		return res.status(409).json({
			message:
				"The bookId and hadith id are required and must be number. (e.g. /book/1/hadith/1 for the first hadith in Sahih Bukhari).",
		});
	}

	const hadith = await hadithsCol.findOne({ bookId, idInBook: id });

	if (!hadith) {
		return res.status(404).json({
			message: `There is no hadith with id ${id} in book ${bookId}.`,
		});
	}

	return res.status(200).json(without_id(hadith));
};
