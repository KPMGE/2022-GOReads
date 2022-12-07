import React from 'react'
import { SideBar } from '../components/SideBar/SideBar';
import Table from '../components/Table';
import styles from '../styles/Fines.module.css'

const Fines = () => {
  return (
    <>
    <header className={styles.header}>
      <SideBar />
      <h1>Fines</h1>
    </header>
    <div className={styles.container}>
      <Table />
    </div>
    </>
  )
}

export default Fines;
