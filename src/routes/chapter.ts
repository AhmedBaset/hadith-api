import { Router } from "express";

import {
	getAllChapters,
	getBookChapters,
	getChapterById,
} from "./../controllers/chapterControllers.js";

const router = Router();

router.get("/chapter", getChapterById);
router.get("/chapters", getAllChapters);
router.get("/book/:id/chapters", getBookChapters);

export { router as chapterRouter };
