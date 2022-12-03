import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SideBar } from '../components/SideBar/SideBar'

export default () => {
  return <SideBar />
  // return (
  //   <div className={styles.container}>
  //     <div className={styles.header}>
  //       <span>Login</span>
  //       <Image
  //         src="/login.svg"
  //         alt="Picture of the author"
  //         width={300}
  //         height={300}
  //       />
  //     </div>

  //     <div className={styles.main}>
  //       <div className={styles.inputs}>
  //         <div className={styles.innerInput}>
  //           <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
  //           <input type='email'  placeholder='email'/>
  //         </div>

  //         <div className={styles.innerInput}>
  //           <FontAwesomeIcon className={styles.icon} icon={faLock} />
  //           <input type='text' placeholder='password'/>
  //         </div>
  //       </div>

  //       <button>Login</button>
  //       <Link href="/register">I don't have an account</Link>
  //     </div>
  //   </div>
  // )
}
