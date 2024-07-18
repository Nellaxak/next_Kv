import { memo, Suspense } from "react";
import { For } from 'react-loops';
import ListItem from '../ListItem/page';
import styles from "./page.module.css";
import dynamic from 'next/dynamic'
import Item from '@/types/Item'

const DynamicItem = dynamic(() => import('../ListItem/page'), {
    loading: () => <span>Loading...</span>,
})
export interface Props {
    items: Item[],
}
const ListRow = (props: Props) => {
    const items = props.items
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ul className={styles.row}>
                <For of={items} as={
                    (item) => {
                        return (
                            <DynamicItem item={item} keys={item.id} />
                        )
                    }
                }
                />
            </ul>
        </Suspense>
    )
}
export default memo(ListRow)
