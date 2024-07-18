import { createElement, memo } from "react";
import styles from "./page.module.css";

const MessageClear = () => {
    return createElement('h2', { className: styles.text }, 'Заказ отправлен!')

}
export default memo(MessageClear)