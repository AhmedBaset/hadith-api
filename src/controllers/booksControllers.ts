import { without_id } from "./../helpers/remove_id.js";
import { hadithDB } from "../mongodb.js";
import { RequestHandler } from "express";

export const getAllBooks: RequestHandler = async (_, res) => {
	const books = await hadithDB
		.collection("booksMetadata")
		.find({})
		.project({ _id: 0 })
		.sort({ id: 1 })
		.toArray();

	if (!books.length) {
		return res.status(404).json({
			message: "There is no books in the database.",
		});
	}

	res.status(200).json(books);
};

export const getBookById: RequestHandler = async (req, res) => {
	const { id: ID } = req.query;
	const id = parseInt(ID as string);

	if (!id) {
		return res.status(409).json({
			message:
				"The id query is required and must be number. (e.g. /book?id=1 for Sahih Bukhari)",
		});
	}

	const book = await hadithDB.collection("booksMetadata").findOne({ id });

	if (!book) {
		const booksLength = await hadithDB
			.collection("booksMetadata")
			.countDocuments();
		return res.status(404).json({
			message: `There is no book with the ${id}. Try a number between 1 and ${booksLength}.`,
		});
	}

	res.status(200).json(without_id(book));
};
