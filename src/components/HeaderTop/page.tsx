import styles from "./page.module.css";
const HeaderTop = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.armageddon}>ARMAGEDDON 2023</h1>
      <div className={styles.command}>
        <span>
          ООО “Команда им. Б. Уиллиса”.
        </span>
        <span>
          Взрываем астероиды с 1998 года.
        </span>
      </div>
    </header>
  );
};
export default HeaderTop