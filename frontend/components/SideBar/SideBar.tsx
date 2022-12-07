import React, { useEffect, useState } from "react";
import { animated } from "react-spring";
import { useAnimation } from "./useAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlusCircle, faHome, faList, faMoneyBill, faPenFancy } from '@fortawesome/free-solid-svg-icons'
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

  const handleAddBook = (event: any) => {
    event.preventDefault()
    Router.push('/new-book')
  }

  const handleGoHome = (event: any) => {
    event.preventDefault()
    Router.push('/')
  }

  return (
    <div className="app">
      <animated.div className={styles.main} style={animatedStyles.main}>
        <button className={styles.btn} onClick={toggle}>
          <FontAwesomeIcon className={styles.icon} icon={faBars} />
        </button>
      </animated.div>

      <animated.div className={styles.sidebar} style={animatedStyles.sidebar}>
        <div onClick={ handleGoHome } className={styles.iconfunction}>
          <FontAwesomeIcon className={styles.icon} icon={faHome} />
          <h4>Home</h4>
        </div>

        {user?.is_admin && (
          <div onClick={ handleAddBook } className={styles.iconfunction}>
            <FontAwesomeIcon className={styles.icon} icon={faPlusCircle} />
            <h4>Adicionar Livro</h4>
          </div>
        )
        }

        <div className={styles.iconfunction}>
          <FontAwesomeIcon className={styles.icon} icon={faList} />
          <h4>Empréstimos</h4>
        </div>
        <div className={styles.iconfunction}>
          <FontAwesomeIcon className={styles.icon} icon={faMoneyBill} />
          <h4>Multas</h4>
        </div>
      </animated.div>
    </div>
  );
}
