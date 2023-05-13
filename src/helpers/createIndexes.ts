import { hadithDB } from "../mongodb.js";

export const createMongoDbIndexes = async () => {
	const hadithsCol = hadithDB.collection("hadiths");
	const booksCol = hadithDB.collection("books");
	const chaptersCol = hadithDB.collection("chapters");

	await hadithsCol.createIndexes([
		{ key: { id: 1 }, unique: true },
		{ key: { idInBook: 1 } },
	]);

	await booksCol.createIndex({ id: 1 }, { unique: true });

	await chaptersCol.createIndex({ bookId: 1 }, { unique: true });
};
