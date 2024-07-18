//import ItemsProps from '@/types/interfaces/items';

import ListRow from '@/components/ListRow/page';
import Item from '@/types/Item'
import styles from "./page.module.css";

const Page = async () => {
    //const viewtype: any = undefined

    const res = await fetch('http://localhost:3456/basket',
        { cache: "no-store" });
    const items: Item[] = await res.json()
    return (
        <ListRow items={items} />
    )
}
/*Page.getLayout = function getLayout(page: any) {
    return (
        //<Layout>
        <MainPageLayout>{page}</MainPageLayout>
        //</Layout>
    )
}*/
export default Page