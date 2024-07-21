import ListRow from '@/components/ListRow/page';
import Item from '@/types/Item'
import http from '@/utils/http'

const Page = async () => {
    const items = await http<Item[]>('http://localhost:3456/basket') as Item[];

    return (
        <ListRow items={items} />
    )
}
export default Page