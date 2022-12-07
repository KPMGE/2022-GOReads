import React from 'react'
import styles from '../styles/NewBook.module.css'
import { alertError } from '../utils'
import Router from 'next/router';
import { useBooks } from '../hooks/useBooks';

export default function NewBook() {
  const { addBook } = useBooks()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const data = {
      title: event.target.title.value,
      author: event.target.author.value,
      description: event.target.description.value,
    }

    if (!data.title) return await alertError('The title field is required!')
    if (!data.author) return await alertError('The author field is required!')
    if (!data.description) return await alertError('The description field is required!')

    try {
      await addBook(data)
    } catch (error) {
      await alertError('Error when saving book, please try again!')
    }

    const LOCAL_STORAGE_KEY = "isSidebarOpen";
    localStorage.setItem(LOCAL_STORAGE_KEY, 'false')
    Router.push('/list-books');
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>NEW BOOK</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type='text' placeholder='Title' name='title' />
          <input type='text' placeholder='Author' name='author' />
          <input type='text' placeholder='Description' name='description' />

          <button>Save</button>
        </form>
      </div>
    </div>
  )
}
