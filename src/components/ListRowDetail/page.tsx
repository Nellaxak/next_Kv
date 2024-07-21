import { memo, Suspense, createElement } from "react";
import { For } from 'react-loops';
import styles from "./page.module.css";
import dynamic from 'next/dynamic'
//import Phrase from '../Phrase/page';

import Item from '@/types/Item'
import HeaderDetail from '@/types/HeaderDetail'
import MyComponentProps from '@/types/MyComponentProps'

const DynamicItem = dynamic<MyComponentProps>(() => import('../ListItemDetail/page'), {
    loading: () => <span>Loading...</span>, ssr: true
})

export interface Props {
    header: HeaderDetail;
    items: Item[];
}
const ListRowDetail = (props: Props) => {
    const { header, items } = { ...props }
    const phraseName = createElement('span', null, ['Название: ' + header.name])
    const phraseDiameter = createElement('span', null, ['Диаметр в метрах: ' + header.estimated_diameter])
    const phraseDanger = createElement('span', null, ['Потенциальная опасность: ' +
        String(header.is_potentially_hazardous_asteroid)])
    const li = createElement('header', { className: styles.detail_header },
        [phraseName, phraseDiameter, phraseDanger])
    return (
        <div className={styles.li}>
            {li}
            <Suspense fallback={<p>Loading...</p>}>
                <ul className={styles.row}>
                    <For of={items} as={
                        (item, index) => {
                            //console.log('detail list', item)
                            return (
                                <DynamicItem item={item} />
                            )
                        }
                    }
                    />
                </ul>
            </Suspense>
        </div>)
}
export default memo(ListRowDetail)
