import { memo, Suspense } from "react";
import { For } from 'react-loops';
import ListItem from '../ListItem/page';
import styles from "./page.module.css";
import dynamic from 'next/dynamic'
import Item from '@/types/Item'
import MyComponentProps from '@/types/MyComponentProps'

/*const DynamicItem = dynamic<MyComponentProps>(() => import('../ListItem/page'), {
    loading: () => <span>Loading...</span>, ssr: true
})*/

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
                            <ListItem item={item} />
                        )
                    }
                }
                />
            </ul>
        </Suspense>
    )
}
export default memo(ListRow)
