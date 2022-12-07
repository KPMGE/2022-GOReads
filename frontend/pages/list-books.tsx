import React, { useEffect } from 'react'
import { Book } from '../@types/book'
import { Borrowing } from '../@types/borrowing'
import { api } from '../api'
import { BookCard } from '../components/Book'
import { SideBar } from '../components/SideBar/SideBar'
import { useBooks } from '../hooks/useBooks'
import styles from '../styles/ListBooks.module.css'

export default () => {
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

      const responseBorrowings = await api.get('user/myBorrowings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const books = responseBooks.data as Book[]
      const filteredBooks = books.filter(book => !checkIsBorrowed(book, responseBorrowings.data))
      addBooks(filteredBooks)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => getBooks())()
  }, [books])

  return (
    <>
    <header className={styles.header}>
      <SideBar />
      <h1>Books</h1>
    </header>

    <div className={styles.container}>
      {books && books.map(book => 
        <BookCard
        title={book.title}
        description={book.description}
        author={book.author}
        id={book.id as number}
        key={book.id}
        />
      )}
    </div>
    </>
  )
}
