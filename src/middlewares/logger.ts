import path from "node:path";
import url from "node:url";
import { existsSync } from "fs";
import { mkdir, appendFile } from "fs/promises";
import { ErrorRequestHandler, RequestHandler } from "express";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const logEvents = async (fileName: string, message: (string | number)[]) => {
	const DIR = path.join(__dirname, "..", "logs");
	if (!existsSync(DIR)) await mkdir(DIR);

	const FILE_PATH = path.join(DIR, fileName);
	await appendFile(FILE_PATH, message.join("\t") + "\n");
};

let INDEX = 1;
const logger: RequestHandler = async (req, res, next) => {
	const { method, url, hostname } = req;
	const date = new Date().toISOString();

	await logEvents("Requests.log", [INDEX++, date, method, hostname, url]);

	next();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorLogger: ErrorRequestHandler = async (err, _req, _res, _next) => {
	const date = new Date().toISOString();

	await logEvents("Errors.log", [date, err.name, err.message]);
};

export { logger, errorLogger, logEvents };
