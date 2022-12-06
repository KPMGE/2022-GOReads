import React from 'react'
import Router from 'next/router'
import { api } from '../../api'
import styles from '../../styles/Book.module.css'
import { alertError } from '../../utils'

const defaultBorrowingDuration = 10
const defaultFinePerDay = 1.0

type Props = {
  id: number
  title: string
  author: string
  description?: string
}

export const BookCard: React.FC<Props> = ({ id, title, author, description }) => {
  const handleBorrowBook = async () => {
    const data = {
      borrowingDuration: defaultBorrowingDuration,
      finePerDay: defaultFinePerDay,
      bookId: id
    }

    const token = localStorage.getItem('token')
    try {
      await api.post('book-borrowing', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(`Book ${id} borrowed!`)
      Router.push('/list-books')
    } catch (error) {
      await alertError('Something went wrong, please try again')
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <h4>{author}</h4>
      <p>{description ? description : ""}</p>
      <button className={styles.button} onClick={ handleBorrowBook } >Borrow</button>
    </div>
  )
}
