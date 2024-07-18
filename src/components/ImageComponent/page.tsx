import { createElement, memo } from "react";
import Image from 'next/image';
import styles from "./page.module.css";

import IImage from '@/types/IImage'

const ImageComponent = (props: IImage) => {
  const image = props;
  const { src, alt, size } = image;
  //console.log('ImageComponent', src)
  let imgNode: React.ReactNode
  if (src === undefined) {
    //console.log('src img null')
    return null;
  }
  if (size === '100%') {
    imgNode = createElement(Image, {
      className: styles.svg,
      src: src,
      alt: alt,
      priority: true
    })
  }
  else {
    imgNode = createElement(Image, {
      src: src,
      alt: alt,
      priority: true
    })
  }
  return (
    imgNode
  )
}
export default memo(ImageComponent)