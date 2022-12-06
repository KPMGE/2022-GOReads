import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { Book } from '../components/Book'
import { useBooks } from '../hooks/useBooks'
import styles from '../styles/ListBooks.module.css'

type Book = {
  id: number
  title: string
  description: string
  author: string
}

type Borrowing = {
  id: number
  borrowing_duration: number
  fine_per_day: number
  user_id: number
  book_id: number
}

export default () => {
  // const [books, setBooks] = useState<Book[]>([])
  const { addBooks, books } = useBooks()

  const checkIsBorrowed = (book: Book, borrowings: Borrowing[]) => {
    for (const borrowing of borrowings) {
      if (book.id === borrowing.book_id) return true
    }
    return false
  }

  const getBooks = async () => {
    try {
      const token = localStorage.getItem('token')

      const responseBooks = await api.get('books', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const responseBorrowings = await api.get('book-borrowing', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const filteredBooks = responseBooks.data.filter(book => !checkIsBorrowed(book, responseBorrowings.data))
      addBooks(filteredBooks)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => getBooks())()
  }, [])

  return (
    <div className={styles.container}>
      { books.map(book => <Book title={book.title} description={book.description} author={book.author} id={book.id} key={book.id} />) }
    </div>
  )
}
