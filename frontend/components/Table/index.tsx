import React from 'react'
import { useBooks } from '../../hooks/useBooks'
import styles from "../../styles/Table.module.css"
import dayjs from 'dayjs'

const defaultBorrowingDuration = 7
const defaultTax = 1.5


const Table = () => {
  const { borrowedBooks } = useBooks()

  const formatDate = (date?: string) => {
    if (!date) return ''
    const dateObj = new Date(date)
    return dayjs(dateObj).format("YYYY/MM/DD");
  }

  const formatFineDate = (date?: string) => {
    if (!date) return ''
    const currentDate = new Date(date)
    const newDate = dayjs(currentDate).add(7, 'day')
    return dayjs(newDate).format("YYYY/MM/DD");
  }

  const getNumberOfDays = (start: Date, end: Date) =>  {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

  const calculateFine= (startDateStr?: string) => {
    if (!startDateStr) return 0
    const start = new Date(startDateStr)
    const now = new Date()
    const days = getNumberOfDays(start, now);
    if (days > defaultBorrowingDuration) {
      return days * defaultTax
    }
    return 0
  }

  return (
    <div className={styles.container}>
      <table className={styles.borrowings}>
        <tbody>
          <tr>
            <td className={styles.th}>Book</td>
            <td className={styles.th}>Borrowing Date</td>
            <td className={styles.th}>Return Date</td>
            <td className={styles.th}>Fine</td>
          </tr>

          {borrowedBooks && borrowedBooks.map(book => (
            <tr key={book.id}>
              <td className={styles.td}>{book.title}</td>
              <td className={styles.td}>{formatDate(book.created_at)}</td>
              <td className={styles.td}>{formatFineDate(book.created_at)}</td>
              <td className={styles.td}>R${calculateFine(book.created_at)}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table;
