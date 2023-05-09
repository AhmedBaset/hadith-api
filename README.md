## Endpoints

| Method | Endpoint             | Description                                       | Returned Type          |
| ------ | -------------------- | ------------------------------------------------- | ---------------------- |
| GET    | `/chapter?id=1`      | Returns a chapter with the given id.              | `Chapter` / `AError`   |
| GET    | `/chapters`          | Returns all chapters.                             | `Chapter[]` / `AError` |
| GET    | `/bookChapters?id=1` | Returns all chapters of a book with the given id. | `Chapter[]` / `AError` |
| GET    | `/book?id=1`         | Returns a book with the given id.                 | `Book` / `AError`      |
| GET    | `/books`             | Returns all books.                                | `Book[]` / `AError`    |
