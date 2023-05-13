# Hadith-API

Hadith-API is a RESTful API that provides a simple way to access the hadiths from 17 books of hadiths, including the nine books and others. From [`hadith-json` That was scraped here](https://github.com/A7med3bdulbaset/hadith-json).

The API written in Node.js using Express.js framework and MongoDB for the database.

## API Endpoints

| Method | Endpoint                   | Description                                             | Example            |
| ------ | -------------------------- | ------------------------------------------------------- | ------------------ |
| `GET`  | `/docs`                    | Get all the endpoints of the API.                       | `/docs`            |
| `GET`  | `/books`                   | Get all the books in the database.                      | `/books`           |
| `GET`  | `/book/:id`                | Get a book with the specified id.                       | `/book/1`          |
| `GET`  | `/book/:id/chapters`       | Get all the chapters of the book with the specified id. | `/book/1/chapters` |
| `GET`  | `/chapters`                | Get all the chapters in the database.                   | `/chapters`        |
| `GET`  | `/chapter/:id`             | Get a chapter with the specified id.                    | `/chapter/1`       |
| `GET`  | `/hadith/:id`              | Get a hadith with the specified id.                     | `/hadith/1`        |
| `GET`  | `/book/:bookId/hadith/:id` | Get a hadith with the specified book id and hadith id   | `/book/1/hadith/1` |

## Before you start

Previously, We scraped the hadiths from the website sunnah.com and stored them in a MongoDB database. You can find the database in the [`hadith-json` repository](https://github.com/A7med3bdulbaset/hadith-json).

## Installation

1. Clone the repository.

```bash
git clone https://github.com/a7med3bdulbaset/hadith-api.git
```

2. Install the dependencies.

```bash
# NPM
npm install
# Yarn
yarn install
```

3. Setup the `.env` file as the `.env.example` file.

```env
# The port that the server will run on.
PORT=3500 # Change it if conflict with another port.

# The MongoDB connection string. 
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<DATABASE>.mongodb.net/?retryWrites=true&w=majority
```

To get the MONGODB_URI, You need to store the database [from the `hadith-json` repository](https://github.com/a7med3bdulbaset/hadith-json) in MongoDB Atlas. Then, get the connection string from the Atlas dashboard.

4. Compile the TypeScript code.

```bash
# NPM
npm run build
# Yarn
yarn build
```

5. Start the server.

```bash
# NPM
npm start
# Yarn
yarn start
```

This will run the server on `http://localhost:3500`. You can change the port in the `.env` file.

6. Dev server.

```bash
# NPM
npm run dev
# Yarn
yarn dev
```
