import { createElement, memo } from "react";
import Link from "next/link";

import styles from "./page.module.css";
export interface Item {
  name: string,
  idView: number,
}
export interface Props {
  item: Item,
}
const LinkComponent = (props: Props) => {
  const item = props.item;
  const link = createElement(Link, {
    className: styles.link,
    href: `/items/${item.idView}`,
    scroll: false,
  }, item.name)
  return (
    link
  )
}
export default memo(LinkComponent)