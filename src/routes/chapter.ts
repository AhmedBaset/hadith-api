import { Router } from "express";

import { hadithDB } from "./../mongodb.js";

const router = Router();

router.get("/chapter", async (req, res) => {
	const { id: ID } = req.query;
	const id = parseInt(ID as string);

	if (!id) {
		return res
			.status(409)
			.json({
				message:
					"The id query is required and must be number. (e.g. /chapter?id=5)",
			});
	}

	const chapters = hadithDB.collection("chapters");

	const chapter = await chapters.findOne({
		id: +id,
	});

	if (chapter) {
		return res.status(200).json(chapter);
	} else {
		const chaptersCount = await chapters.countDocuments();

		return res.status(404).json({
			message: `There is no chapter with id ${id}. Try a vaild id from 1 - ${chaptersCount}`,
		});
	}
});

export { router as chapterRouter };
