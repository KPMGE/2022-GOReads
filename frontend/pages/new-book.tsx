import React from 'react'
import styles from '../styles/NewBook.module.css'
import { api } from '../api'
import { alertError } from '../utils'
import Router from 'next/router';


export default function NewBook() {
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
      const token = localStorage.getItem('token')
      await api.post('books', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      Router.reload();
    } catch (error) {
      await alertError('Something went wrong, please try again')
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <h1>NEW BOOK</h1>
      <form onSubmit={ handleSubmit } className={styles.form}>
        <input type='text' placeholder='Title' name='title' />
        <input type='text' placeholder='Author' name='author' />
        <input type='text' placeholder='Description' name='description' />

        <button>Save</button>
      </form>
    </div>
  )
}
