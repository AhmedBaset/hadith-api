import dotenv from "dotenv";
import express from "express";

dotenv.config();

import { client } from "./mongodb.js";
import { errorLogger, logEvents, logger } from "./middlewares/logger.js";
import { createMongoDbIndexes } from "./helpers/createIndexes.js";

import { notFoundRouter } from "./routes/notFound.js";
import { bookRouter } from "./routes/book.js";
import { chapterRouter } from "./routes/chapter.js";
import { hadithRouter } from "./routes/hadith.js";
import { docsRoute } from "./routes/docs.js";

const app = express();

//* Middleware
//* - Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* - Custom middleware
app.use(logger);

//* Routes
app.use(chapterRouter);
app.use(bookRouter);
app.use(hadithRouter);
app.use("/docs", docsRoute);

app.use(notFoundRouter);

app.use(errorLogger);

// Start the server
const PORT = process.env.PORT || 3500;

client.connect().then(() => {
	app.listen(PORT, async () => {
		console.log(`Server is running on port ${PORT}.`);
	});
});

createMongoDbIndexes();

client.on("error", (err) => {
	console.error(err);
	logEvents("MongoDbErrors.log", [
		new Date().toISOString(),
		err.name,
		err.message,
	]);
});
