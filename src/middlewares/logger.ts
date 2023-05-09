import path from "node:path";
import url from "node:url";
import { existsSync } from "fs";
import { mkdir, appendFile } from "fs/promises";
import { RequestHandler } from "express";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const logEvents = async (fileName: string, message: (string | number)[]) => {
	const DIR = path.join(__dirname, "..", "logs");
	if (!existsSync(DIR)) await mkdir(DIR);

	const FILE_PATH = path.join(DIR, fileName);
	await appendFile(FILE_PATH, message.join("\t") + "\n");

	console.log(message.join("\t"));
};

let INDEX = 1;
const logger: RequestHandler = async (req, res, next) => {
	const { format } = new Intl.DateTimeFormat("en-US", {
		dateStyle: "short",
		timeStyle: "short",
	});

	const { method, url } = req;
	const { statusCode } = res;

	await logEvents("Requests.log", [
		INDEX++,
		method,
		url,
		statusCode,
		format(Date.now()),
	]);

	next();
};

const errorLogger = async (err: Error) => {
	const { format } = new Intl.DateTimeFormat("en-US", {
		dateStyle: "short",
	});

	await logEvents("Errors.log", [err.name, err.message, format(Date.now())]);
};

export { logger, errorLogger };
