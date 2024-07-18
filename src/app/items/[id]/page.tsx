import {
    GetServerSideProps, GetServerSidePropsContext,
    NextPage
} from 'next';
import { createElement, memo } from "react";
import ListItem from '@/components/ListItem/page';
import ListRowDetail from '@/components/ListRowDetail/page';
import { Metadata, ResolvingMetadata } from 'next'
import Item from '@/types/Item'
import ListDetail from '@/types/ListDetail'
import HeaderDetail from '@/types/HeaderDetail'


type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id
    // fetch data
    const item: [HeaderDetail, ListDetail[]] = await fetch(`http://localhost:3456/detail?id=${id}`,
    ).then((res) => res.json())
    //console.log('detail meta', item)
    return {
        title: item[0].name,
    }
}
/*async function http(
    //request: RequestInfo,
    id: string,
): Promise<any> {
    try {
        const response = await fetch(`http://localhost:3456/detail?id=${id}`, {
            cache: "no-store",
        });
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
export default getDetails