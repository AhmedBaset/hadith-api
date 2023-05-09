import path from "node:path";
import { existsSync } from "fs";
import { mkdir, appendFile } from "fs/promises";
import { NextFunction } from "express";

const logEvents = async (fileName: string, message: string[]) => {
	const DIR = path.join(__dirname, "..", "logs");
	if (!existsSync(DIR)) await mkdir(DIR);

	const FILE_PATH = path.join(DIR, fileName);
	await appendFile(FILE_PATH, message.join("\t") + "\n");
};

let INDEX = 1;
const logger = async (req: Request, res: Response, next: NextFunction) => {
	const { format } = new Intl.DateTimeFormat(undefined, {
		dateStyle: "short",
	});

	await logEvents("Requests.log", [
		INDEX.toString(),
		req.method,
		req.url,
		format(Date.now()),
	]);
	INDEX++;
};

const errorLogger = async (err: Error) => {
	const { format } = new Intl.DateTimeFormat(undefined, {
		dateStyle: "short",
	});

	await logEvents("Errors.log", [err.name, err.message, format(Date.now())]);
};

export { logger, errorLogger };