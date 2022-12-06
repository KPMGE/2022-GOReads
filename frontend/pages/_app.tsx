import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { BooksProvider } from '../context/provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BooksProvider>
      <Component {...pageProps} />
    </BooksProvider>
  )
}
