import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Book.module.css'
import { alertError } from '../../utils'
import { useBooks } from '../../hooks/useBooks'


type Props = {
  id: number
  title: string
  author: string
  description?: string
}

export const BookCard: React.FC<Props> = ({ id, title, author, description }) => {
  const { borrowBook } = useBooks()

  const handleBorrowBook = async () => {
    try {
      await borrowBook(id)
    } catch (error) {
      await alertError('Something went wrong, please try again')
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <p className={styles.name}>{title}</p>
        <Image
          src="/bookblue.png"
          alt="Picture of the author"
          width={130}
          height={100}
        />
        <p className={styles.author}>{author}</p>
        <p className={styles.about}>
          {description}
        </p>
        <button onClick={handleBorrowBook}>Borrow</button>
      </div>
    </div>
  )
}
