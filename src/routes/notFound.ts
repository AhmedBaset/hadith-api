import { Router } from "express";

const router = Router();

router.use("/", (req, res) => {
	res.status(404).json({
		message: `This endpooit (${req.url}) is not valid. Visit our doc. or request (/docs) for all valid endpoints.`,
	});
});

export { router as notFoundRouter };
