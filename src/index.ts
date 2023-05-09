import dotenv from "dotenv";
dotenv.config();

import express from "express";
import chalk from "chalk";
import { chapterRouter } from "./routes/chapter.js";

import { errorLogger, logEvents, logger } from "./middlewares/logger.js";
import { notFoundRouter } from "./routes/notFound.js";
import { client } from "./mongodb.js";

const app = express();

//* Middleware
//* - Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* - Custom middleware
app.use(logger);

//* Routes
app.use(chapterRouter);

app.use(notFoundRouter);

app.use(errorLogger);

const PORT = process.env.PORT || 3500;

client.connect().then(() => {
	app.listen(PORT, async () => {
		console.log(
			chalk.cyan(`Server is running on port ${chalk.cyanBright(PORT)}.`)
		);
	});
});

client.on("error", (err) => {
	console.error(err);
	logEvents("MongoDbErrors.log", [
		err.name,
		err.message,
		new Date().toLocaleString(),
	]);
});
