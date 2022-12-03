import React from "react";
import { animated } from "react-spring";
import { useAnimation } from "./useAnimation";
import styles from '../../styles/Sidebar.module.css'

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

  return (
    <div className="app">
      <animated.div className={styles.main} style={animatedStyles.main}>
        <button className={styles.btn} onClick={toggle}>
          Toggle
        </button>
      </animated.div>

      <animated.div className={styles.sidebar} style={animatedStyles.sidebar}>
        <h4>Hello</h4>
        <h4>leonardo corno</h4>
        <h4>alo</h4>
        <h4>youup</h4>
        <h4>Hedfsdfadfllo</h4>
      </animated.div>
    </div>
  );
}
