import ListRow from '@/components/ListRow/page';
import Item from '@/types/Item'
import HttpResponse from '@/types/HttpResponse'

async function http<T>(
    request: RequestInfo,
): Promise<Item[] | unknown> {
    try {
        const response: HttpResponse<T> = await fetch(
            request, {
            cache: "no-store",
        });
        const parsedBody: Item[] = await response.json();
        return parsedBody;
    }
    catch (err: unknown) {
        console.log('err', err)
    }
}
const Page = async () => {
    const items = await http<Item[]>('http://localhost:3456/basket') as Item[];

    return (
        <ListRow items={items} />
    )
}
export default Page