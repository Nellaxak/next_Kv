import { createElement, memo } from "react";
import styles from "./page.module.css";
import ButtonClear from '../ButtonClear/page'
import Output from '../Output/page'

export interface Item {
  valueCount: number,
}
const FooterBasket = (props: Item) => {
  const valueCount = createElement(Output, [String(props.valueCount)], null)
  const phraseCount = createElement('span', { className: styles.padding }, valueCount)
  const phraseAsteroid = createElement('span', { className: styles.aster }, 'астероида')

  const divWrapper = createElement('div', { className: styles.wrapRow }, [phraseCount, phraseAsteroid])
  const phraseBasket = createElement('span', { className: styles.h3 }, 'Корзина')
  const divWrapColumn = createElement('div', { className: styles.wrapColumn }, [phraseBasket, divWrapper])
  const buttonClear = createElement(ButtonClear, null, null)
  const footerTag = createElement('footer', { className: styles.footer }, [divWrapColumn, buttonClear])

  return footerTag

}
export default memo(FooterBasket)