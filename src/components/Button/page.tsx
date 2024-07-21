'use client'
import React, { Suspense, memo, useCallback, createElement, useEffect } from "react";
import Output from "../Output/page";
import { useRouter, usePathname } from "next/navigation"
import styles from "./page.module.css";
import io from 'socket.io-client';
import dynamic from 'next/dynamic'
import MyComponentProps from '@/types/MyComponentProps'

const socket = io('ws://localhost:3456')
/*export interface Item {
    id: number,
    danger: number
}*/
const Button: React.FC<MyComponentProps> = (props) => {
    let status: string[] = ['ЗАКАЗАТЬ']
    let outputTag: React.ReactNode
    let buttonTag: React.ReactNode
    const item = props.item
    const router = useRouter()
    const pathname = usePathname()
    //console.log('button path', pathname)
    const handleSubmit = useCallback(
        async () => {
            //event.preventDefault();
            socket.emit('patch', item.id)
            router.refresh()
        }, []);
    if (item.danger === 0) {
        status = ['ЗАКАЗАТЬ']
        outputTag = createElement(Output, status, null)
        buttonTag = createElement('button', {
            type: 'submit',
            className: styles.button,
            onClick: handleSubmit
        }, outputTag)
    }
    else {
        status = ['В КОРЗИНЕ']
        outputTag = createElement(Output, status, null)
        buttonTag = createElement('button', {
            type: 'submit',
            className: styles.buttonInBasket,
            onClick: handleSubmit
        }, outputTag)
    }
    if (pathname === '/basket') {
        buttonTag = null
    }
    return buttonTag
}
export default memo(Button)
//export default dynamic<MyComponentProps>(() => Promise.resolve(Button), { ssr: false });
