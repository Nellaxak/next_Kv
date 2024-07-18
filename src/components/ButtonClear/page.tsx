import styles from "./page.module.css";
import Link from 'next/link';

const ButtonClear = () => {
    return (
        <nav>
            <Link href="/basket"
                scroll={false}
                className={styles.button}
            >
                <span className={styles.padding}>Отправить</span>
            </Link>
        </nav>
    )
}

export default ButtonClear