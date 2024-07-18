import { createElement, memo } from "react";
import styles from "./page.module.css";

const Output = (props: string[]) => {
    return createElement('output', { className: styles.padding }, props['0'])
}
export default memo(Output)