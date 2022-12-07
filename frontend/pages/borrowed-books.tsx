import React from 'react'
import { BookCard } from '../components/Book'
import { SideBar } from '../components/SideBar/SideBar'
import { useBooks } from '../hooks/useBooks'
import styles from '../styles/ListBooks.module.css'

const ListBooks = () => {
  const { borrowedBooks } = useBooks()

  return (
    <>
    <header className={styles.header}>
      <SideBar />
      <h1>Borrowed Books</h1>
    </header>

    <div className={styles.container}>
      {borrowedBooks && borrowedBooks.map(book => 
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

export default ListBooks;
