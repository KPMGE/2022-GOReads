import React from 'react'
import { BookCard } from '../components/Book'
import { SideBar } from '../components/SideBar/SideBar'
import { useBooks } from '../hooks/useBooks'
import { useUser } from '../hooks/useUser'
import styles from '../styles/ListBooks.module.css'

const ListBooks = () => {
  const { books } = useBooks()
  const { user } = useUser()

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
        showBorrowButton={!user?.is_admin}
        key={book.id}
        />
      )}
    </div>
    </>
  )
}

export default ListBooks;
