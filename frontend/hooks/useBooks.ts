import { useContext } from "react";

import { BooksContext } from "../context/provider";

export const useBooks = () => useContext(BooksContext);
