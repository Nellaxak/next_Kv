import ListRow from '@/components/ListRow/page';
import Item from '@/types/Item'

const Page = async () => {
    const res = await fetch('http://localhost:3456/basket',
        { cache: "no-store" });
    const items: Item[] = await res.json()
    return (
        <ListRow items={items} />
    )
}
export default Page