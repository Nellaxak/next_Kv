import {
    GetServerSideProps, GetServerSidePropsContext,
    NextPage
} from 'next';
import { createElement, memo } from "react";

//import safe from '@/public/images/safe.svg';
//import Button from '@/components/Button/page';
import ListItem from '@/components/ListItem/page';
import ListRowDetail from '@/components/ListRowDetail/page';

//import styles from "./ListItem.module.css";
//import Image from 'next/image';
//import ItemsProps from '../../../types/interfaces/items';
//import Router, { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next'
import Item from '@/types/Item'
import HeaderDetail from '@/types/HeaderDetail'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
//const alt = "Степень опасности астероида."

/*const img = createElement(Image, {
    key: 3, src: safe, alt: alt, priority: true
})*/
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    //console.log('detail metadata', params)
    // read route params
    const id = params.id

    // fetch data
    const item = await fetch(`http://localhost:3456/detail?id=${id}`,
    ).then((res) => res.json())
    // optionally access and extend (rather than replace) parent metadata
    //const previousImages = (await parent).openGraph?.images || []
    return {
        title: item.name,
        /*openGraph: {
          images: ['/some-specific-page-image.jpg', ...previousImages],
        },*/
    }
}
/*async function http(
    //request: RequestInfo,
    id: string,
): Promise<any> {
    try {
        const response = await fetch(`http://localhost:3456/detail?id=${id}`
        );
        console.log('status', response.status)
        const body = await response.json();
        return body;
    }
    catch (err) {
        console.log('err', err)
    }
}*/

const getDetails = async ({ params }: Props) => {
    const id = params.id

    const res = await fetch(`http://localhost:3456/detail?id=${id}`, {
        cache: "no-store",
    });
    //const res = await http(id);
    if (res.status !== 200) {
        throw new Error('Failed to fetch')
    }
    const items: [HeaderDetail, Item[]] = await res.json()
    return (
        <ListRowDetail header={items[0]} items={items[1]} />
    )

}
/*Page.getLayout = function getLayout(page: any) {
    return (
        //<Layout>
        <MainPageLayout>{page}</MainPageLayout>
        //</Layout>
    )
}*/
export default getDetails//memo