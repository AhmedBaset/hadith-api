import { getAllBooks, getBookById } from "@/controllers/booksControllers.js";
import { Router } from "express";

const router = Router();

router.get("/books", getAllBooks); // .../books
router.get("/book", getBookById); // .../book?id=1

export { router as bookRouter };
