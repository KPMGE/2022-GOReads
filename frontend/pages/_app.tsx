import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { BooksProvider } from '../context/booksProvider'
import { UserProvider } from '../context/userContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BooksProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </BooksProvider>
  )
}
