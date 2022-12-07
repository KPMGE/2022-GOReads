import { useContext } from "react";

import { BooksContext } from "../context/booksProvider";

export const useBooks = () => useContext(BooksContext);
