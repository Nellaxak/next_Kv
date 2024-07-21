import ListRowDetail from '@/components/ListRowDetail/page';
import { Metadata, ResolvingMetadata } from 'next'
import Item from '@/types/Item'
import ListDetail from '@/types/ListDetail'
import HeaderDetail from '@/types/HeaderDetail'
import HttpResponse from '@/types/HttpResponse'

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

async function http<T>(
    request: RequestInfo,
): Promise<[HeaderDetail, Item[]] | unknown> {
    try {
        const response: HttpResponse<T> = await fetch(
            request, {
            cache: "no-store",
        });
        const parsedBody: [HeaderDetail, Item[]] = await response.json();
        return parsedBody;
    }
    catch (err: unknown) {
        console.log('err', err)
    }
}
const getDetails = async ({ params }: Props) => {
    const id = params.id
    const res = await http<[HeaderDetail, Item[]]>(`http://localhost:3456/detail?id=${id}`) as [HeaderDetail, Item[]];

    return (
        <ListRowDetail header={res[0]} items={res[1]} />
    )
}
export default getDetails