import React from "react";
import { animated } from "react-spring";
import { useAnimation } from "./useAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlusCircle, faList, faMoneyBill, faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/Sidebar.module.css'
import { useUser } from "../../hooks/useUser";
import Router from 'next/router'

const LOCAL_STORAGE_KEY = "isSidebarOpen";

function useSidebar() {
  const persistedState =
    typeof window === "undefined"
      ? false
      : localStorage.getItem(LOCAL_STORAGE_KEY) === "true";

  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen((value) => !value);

  // Persist to localStorage
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(isOpen));
  }, [isOpen]);

  // Rehydrate with persisted data
  React.useEffect(() => {
    setIsOpen(persistedState);
  }, []);

  return { isOpen, toggle };
}

export const SideBar = () => {
  const { isOpen, toggle } = useSidebar();
  const animatedStyles = useAnimation(isOpen);
  const { user } = useUser()

  const handleAddBook = async (event: any) => {
    event.preventDefault()
    localStorage.setItem(LOCAL_STORAGE_KEY, "false")
    await Router.push('/new-book')
  }

  const handleLogout = async (event: any) => {
    event.preventDefault()
    localStorage.setItem(LOCAL_STORAGE_KEY, "false")
    await Router.push('/')
  }

  const handleBorrowings = async (event: any) => {
    event.preventDefault()
    localStorage.setItem(LOCAL_STORAGE_KEY, "false")
    await Router.push('/borrowed-books')
  }

  const handleGoHome = async (event: any) => {
    event.preventDefault()
    localStorage.setItem(LOCAL_STORAGE_KEY, "false")
    await Router.push('/list-books')
  }

  return (
    <div className="app">
      <animated.div className={styles.main} style={animatedStyles.main}>
        <button className={styles.btn} onClick={toggle}>
          <FontAwesomeIcon className={styles.icon} icon={faBars} />
        </button>
      </animated.div>

      <animated.div className={styles.sidebar} style={animatedStyles.sidebar}>
        <div onClick={handleLogout} className={styles.iconfunction}>
          <FontAwesomeIcon className={styles.icon} icon={faArrowLeft} />
          <h4>Logout</h4>
        </div>

        <div onClick={handleGoHome} className={styles.iconfunction}>
          <FontAwesomeIcon className={styles.icon} icon={faHome} />
          <h4>Books</h4>
        </div>

        {user?.is_admin && (
          <div onClick={handleAddBook} className={styles.iconfunction}>
            <FontAwesomeIcon className={styles.icon} icon={faPlusCircle} />
            <h4>Add a book</h4>
          </div>
        )
        }

        {!user?.is_admin && (
          <div onClick={handleBorrowings} className={styles.iconfunction}>
            <FontAwesomeIcon className={styles.icon} icon={faList} />
            <h4>Borrowings</h4>
          </div>
        )}

        <div className={styles.iconfunction}>
          <FontAwesomeIcon className={styles.icon} icon={faMoneyBill} />
          <h4>Fines</h4>
        </div>
      </animated.div>
    </div>
  );
}
