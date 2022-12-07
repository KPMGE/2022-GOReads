import React, { createContext, useState, useEffect } from "react"
import { Borrowing } from "../@types/borrowing";
import { api } from "../api"
import { alertError } from "../utils";

const defaultBorrowingDuration = 10
const defaultFinePerDay = 1.0

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
  addBooks: (books: Book[]) => void
  addBook: (newBook: Book) => Promise<void>
  borrowBook: (bookId: number) =>  Promise<void>
}

const defaultObject: ValueTypes = {
  books: [],
  addBooks: (_: Book[]) => {},
  addBook: async (_: Book) =>  {},
  borrowBook: async (_: number) =>  {}
}

export const BooksContext = createContext<ValueTypes>(defaultObject)

export const BooksProvider: React.FC<Props> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([])

  const checkIsBorrowed = (book: Book, borrowings: Borrowing[]) => {
    for (const borrowing of borrowings) {
      if (book.id === borrowing.book_id) return true
    }
    return false
  }

  const getBooks = async (): Promise<Book[]> => {
    const token = localStorage.getItem('token')
    const response = await api.get('books', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  }

  const getBookBorrowings = async (): Promise<Borrowing[]> => {
    const token = localStorage.getItem('token')
    const responseBorrowings = await api.get('user/myBorrowings', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return responseBorrowings.data
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

  const borrowBook = async (bookId: number) => {
    const token = localStorage.getItem('token')
    const data = {
      borrowingDuration: defaultBorrowingDuration,
      finePerDay: defaultFinePerDay,
      bookId
    }

    await api.post('book-borrowing', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(`Book ${bookId} borrowed!`)

    const books = await getBooks()
    const borrowings = await getBookBorrowings()
    const filteredBooks = books.filter(book => !checkIsBorrowed(book, borrowings))
    setBooks(filteredBooks)
  }


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getBooks()
        const borrowings = await getBookBorrowings()
        const filteredBooks = books.filter(book => !checkIsBorrowed(book, borrowings))
        setBooks(filteredBooks)
      } catch (err) {
        console.log("Error")
      }
    }

    fetchBooks()
  }, [])

  return (
    <BooksContext.Provider value={{ books, addBooks, addBook, borrowBook }}>
      {children}
    </BooksContext.Provider>
  )
}
