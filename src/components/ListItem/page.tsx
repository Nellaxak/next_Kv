import { createElement, memo } from "react";

import asteroid_big from './asteroid_big.png'
import asteroid_small from './asteroid_small.png'
import caution from './caution-icon.svg'
import styles from "./page.module.css";
import dynamic from 'next/dynamic'
import Button from '../Button/page';

import Output from '../Output/page';
import ImageComponent from '../ImageComponent/page';

import LinkComponent from '../LinkComponent/page';
import IImage from '@/types/IImage'
import MyComponentProps from '@/types/MyComponentProps'

/*const Dynamiclink = dynamic(() => import('../components/header'), {
  loading: () => <p>Loading...</p>,
})*/
/*const DynamicButton = dynamic<MyComponentProps>(() => import('../Button/page'), {
  ssr: false
})*/
const ListItem: React.FC<MyComponentProps> = (props) => {
  const item = props.item
  //console.log('ListItem', item.estimated_diameter)
  let objDanger: IImage;
  const altAsteroid = "Size asteroid."
  let objAsteroid: IImage
  let diameter: number
  try {
    diameter = Number(item.estimated_diameter.meters.estimated_diameter_min)
  }
  catch (err) {
    //console.log('err', item.id)
    diameter = 0
  }
  //const diameter = Number(item.estimated_diameter.meters.estimated_diameter_min)
  if (diameter > 30) {
    objAsteroid = { src: asteroid_big, alt: altAsteroid, size: 'original' }
  } else {
    objAsteroid = { src: asteroid_small, alt: altAsteroid, size: 'original' }
  }
  const calcBigSmall = createElement(ImageComponent, objAsteroid, null)
  const alt = "Степень опасности."
  let danger: React.ReactNode = null
  if (item.dangerView === 'Опасен') {
    objDanger = { src: caution, alt, size: '100%' }
    const imageDanger = createElement(ImageComponent, objDanger, null)//ReactNode[]
    const phraseDanger = createElement('span', null, [item.dangerView])
    danger = createElement('div', { className: styles.danger }, [imageDanger, phraseDanger])
  }
  const button = createElement(Button, { item }, null)
  const diameterTag = createElement('span', null, [String(item.diameterView)])
  const result_distance = createElement(Output, [String(item.result_distance)], null);
  const div_result_distance = createElement('div', { className: styles.middleStart }, result_distance);
  const linkTag = createElement(LinkComponent, { item }, null)
  const divWrap = createElement('div', { className: styles.middleEnd }, [linkTag, diameterTag]);
  const divMiddle = createElement('div', { className: styles.middle }, [div_result_distance, calcBigSmall, divWrap]);
  const divEnd = createElement('div', { className: styles.end }, [button, danger]);
  const liHeader = createElement('span', { className: styles.h2 }, [item.dateReq])
  const liTag = createElement('li', { key: item.id, className: styles.li }, [liHeader, divMiddle, divEnd])

  return liTag
};
export default dynamic<MyComponentProps>(() => Promise.resolve(ListItem), { ssr: true });
