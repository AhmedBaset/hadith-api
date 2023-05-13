import { Router } from "express";
import {
	getHadithByBookIdAndId,
	getHadithById,
} from "../controllers/hadithControllers.js";

const router = Router();

router.get("/hadith/:id", getHadithById); // /hadith/1
router.get("/book/:bookId/hadith/:id", getHadithByBookIdAndId); // /book/1/hadith/1

export { router as hadithRouter };
