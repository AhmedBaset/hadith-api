import { ObjectId } from "mongodb";

export const without_id = (obj: object & { _id: ObjectId }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { _id, ...rest } = obj;
	return rest;
};
