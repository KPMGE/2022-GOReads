import React, { createContext, useState, useEffect } from "react"
import { api } from "../api"
import { alertError } from "../utils";

type Props = {
  children: JSX.Element;
};

type Book = {
  id?: number
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
  addBook: (newBook: Book) => Promise<void>
}

const defaultObject: ValueTypes = {
  books: [],
  error: false,
  loading: false,
  addBooks: (_: Book[]) => {},
  deleteBook: (_: Book) => {},
  addBook: async (_: Book) =>  {}
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

  const addBook = async (newBook: Book): Promise<void> => {
    try {
      const token = localStorage.getItem('token')
      await api.post('books', newBook, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      await alertError('Something went wrong, please try again')
      console.log(error)
    }

    setBooks([...books, newBook])
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
    <BooksContext.Provider value={{ books, loading, error, deleteBook, addBooks, addBook }}>
      {children}
    </BooksContext.Provider>
  )
}
