import { createElement, memo } from "react";
import styles from "./page.module.css";

import dynamic from 'next/dynamic'
//import Phrase from '../Phrase/page';
import Props from '@/types/Props'

/*const Dynamiclink = dynamic(() => import('../components/header'), {
  loading: () => <p>Loading...</p>,
})*/
//export const dynamic = "force-dynamic"

const ListItemDetail = (props: Props) => {
  const { item, keys } = { ...props }
  //console.log('1axsf', item)
  const velocity = item.relative_velocity.kilometers_per_second
  const date = new Date(item.epoch_date_close_approach);
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()
  //console.log('detail epoch_date_close_approach', date, Hours, Minutes, Seconds)
  const phraseDate = createElement('span', null,
    ["Дата сближения: " + item.close_approach_date])
  const phraseTime = createElement('span', null,
    ["Время сближения: " + hours + " часов " + minutes + " минут " + seconds + " секунд "])
  const phraseVelocity = createElement('span', null,
    ["Скорость км/сек: " + velocity])
  const phraseOrbitingBody = createElement('span', null,
    ["Орбита: " + item.orbiting_body])
  const liTag = createElement('li', { key: keys, className: styles.li },
    [phraseDate, phraseTime, phraseVelocity, phraseOrbitingBody])
  return liTag
};
export default memo(ListItemDetail)