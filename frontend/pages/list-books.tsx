import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { Book } from '../components/Book'
import styles from '../styles/ListBooks.module.css'

export default () => {
  const [books, setBooks] = useState<any>([])

  const getBooks = async () => {
    try {
      const response = await api.get('books')
      setBooks(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => getBooks())()
  }, [])

  return (
    <div className={styles.container}>
      { books.map(book => <Book title={book.title} description={book.description} author={book.author} key={book.id} />) }
    </div>
  )
}
