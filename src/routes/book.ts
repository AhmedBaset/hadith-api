import { getAllBooks, getBookById } from "../controllers/bookControllers.js";
import { Router } from "express";

const router = Router();

router.get("/books", getAllBooks); // .../books
router.get("/book/:id", getBookById); // .../book/1

export { router as bookRouter };
