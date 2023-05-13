import { RequestHandler } from "express";

const endpoints = [
	{
		path: "/docs",
		methods: "GET",
		description: "Returns all the endpoints of the API.",
		example: "/docs",
	},
	{
		path: "/books",
		methods: "GET",
		description: "Returns all the books in the database.",
		example: "/books",
	},
	{
		path: "/book/:id",
		methods: "GET",
		description: "Returns the book with the specified id.",
		example: "/book/1",
	},
	{
		path: "/book/:id/chapters",
		methods: "GET",
		description:
			"Returns all the chapters of the book with the specified id.",
		example: "/book/1/chapters",
	},
	{
		path: "/chapters",
		methods: "GET",
		description: "Returns all the chapters in the database.",
		example: "/chapters",
	},
	{
		path: "/chapter/:id",
		methods: "GET",
		description: "Returns the chapter with the specified id.",
		example: "/chapter/1",
	},
	{
		path: "hadith/:id",
		methods: "GET",
		description: "Returns the hadith with the specified id.",
		example: "/hadith/1",
	},
	{
		path: "/book/:bookId/hadith/:id",
		methods: "GET",
		description:
			"Returns the hadith with the specified id from the book with the specified bookId.",
		example: "/book/1/hadith/1",
	},
];

export const docsRoute: RequestHandler = (req, res) => {
	if (req.accepts("html")) {
		res.send(`
      <h1>Hadith-API Documentation</h1>
      <p>For more information, visit <a href="https://github.com/a7med3bdulbaset/hadith-api">Hadith-API</a>.</p>
      <h2>Endpoints</h2>
      <table>
         <thead>
            <tr>
               <th>Path</th>
               <th>Methods</th>
               <th>Description</th>
               <th>Example</th>
            </tr>
         </thead>
         <tbody>
            ${endpoints.map(
					(endpoint) => `
            <tr>
               <td>${endpoint.path}</td>
               <td>${endpoint.methods}</td>
               <td>${endpoint.description}</td>
               <td>${endpoint.example}</td>
            </tr>
            `
				)}
         </tbody>
      </table>
      `);
	} else {
		res.json({
			message:
				"For more information visit https://github.com/a7med3bdulbaset/hadith-api",
			endpoints,
		});
	}
};
