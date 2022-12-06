import React, { createContext, useState, useEffect } from "react"
import { api } from "../api"

type Props = {
  children: JSX.Element;
};

type Book = {
  id: number
  title: string
  description: string
  author: string
}

interface ValueTypes {
  books: Book[] | null;
  loading: boolean;
  error: boolean;
  deleteBook: (book: Book) => void
  addBooks: (books: Book[]) => void
}

const defaultObject: ValueTypes = {
  books: [],
  error: false,
  loading: false,
  addBooks: (books: Book[]) => {},
  deleteBook: (book: Book) => {}
}

export const BooksContext = createContext<ValueTypes>(defaultObject)

export const BooksProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [books, setBooks] = useState<Book[]>([])

  const deleteBook = (book: Book) => {
    console.log('deleteBook', book)
    return null
  }

  const addBooks = (books: Book[]) => {
    setBooks(books)
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await api.get('books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        // set fetched books
        setBooks(response.data)

        setLoading(false)
      } catch (err) {
        console.log("Error")
        setError(true)
      }
    }

    fetchBooks()
  }, [])

  return (
    <BooksContext.Provider value={{ books, loading, error, deleteBook, addBooks }}>
      {children}
    </BooksContext.Provider>
  )
}
