import React from 'react'
import styles from '../../styles/Book.module.css'

type Props = {
  title: string
  author: string
  description?: string
}

export const Book: React.FC<Props> = ({ title, author, description }) => {
  return (
    <>
      <div className={styles.container}>
        <h3>{title}</h3>
        <h4>{author}</h4>
        <p>{description ? description : ""}</p>
        <button className={styles.button}>Borrow</button>
      </div>
    </>
  )
}
