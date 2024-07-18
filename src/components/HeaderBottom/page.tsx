import Toggle from '@/components/Toggle/page';

import styles from "./page.module.css";

import Path from '@/types/Path'

const HeaderBottom = (props: Path) => {
  return (
    <div className={styles.column}>
      <header className={styles.header}>
        <span className={styles.h6}>
          Ближайшие подлёты астероидов
        </span>
      </header>
      <Toggle path={props.path} />
    </div>
  );
};
export default HeaderBottom