import React, { Suspense, memo } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Path from '@/types/Path'

const Toggle = (props: Path) => {
    if (props.path === 'main') {
        return (
            <nav className={styles.labelWrapper} >
                <Link href="/categories/main" scroll={false}
                    className={styles.km}>в километрах</Link>
                <span className={styles.space}>|</span>
                <Link href="/categories/moon" scroll={false}
                    className={styles.moon}>в лунных орбитах</Link>
            </nav>
        )
    }
    else {
        return (
            <nav className={styles.labelWrapper} >
                <Link href="/categories/main" scroll={false}
                    className={styles.moon}>в километрах</Link>
                <span className={styles.space}>|</span>
                <Link href="/categories/moon" scroll={false}
                    className={styles.km}>в лунных орбитах</Link>
            </nav>
        )
    }
}
export default Toggle