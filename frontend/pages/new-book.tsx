import React, { useState } from 'react'
import styles from '../styles/NewBook.module.css'
import { alertError } from '../utils'
import Router from 'next/router';
import { useBooks } from '../hooks/useBooks';
import { api } from '../api';

export default function NewBook() {
  const { addBook } = useBooks()
  const [description, setDescription] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const fetchBookFromDbpedia = async (bookTitle: string) => {
    console.log('here: ', bookTitle)
    if (bookTitle === '') return 

    const response = await api.get(`books/dbpedia/${bookTitle}`)
    const { description, author } = response.data
    setDescription(description)
    setAuthor(author)
  }

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
          <input 
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => fetchBookFromDbpedia(title)} 
            placeholder='Title' name='title' 
          />
          <input 
            type='text' 
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            placeholder='Author' 
            name='author' 
          />
          <textarea 
            value={description} 
            placeholder='Description' 
            name='description' 
          />

          <button>Save</button>
        </form>
      </div>
    </div>
  )
}
