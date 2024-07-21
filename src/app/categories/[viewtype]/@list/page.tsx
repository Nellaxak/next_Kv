import ListRow from '@/components/ListRow/page';
import HeaderBottom from "@/components/HeaderBottom/page";
import styles from "./page.module.css";
import Item from '@/types/Item'
import http from '@/utils/http'

async function Page({ params }) {
  const viewtype: string = params.viewtype
  const items = await http<Item[]>(`http://localhost:3456/${viewtype}`) as Item[];
  return (
    <div className={styles.wrapRow}>
      <HeaderBottom path={viewtype} />
      <form className={styles.wrap}>
        <ListRow items={items} />
      </form>
    </div>
  )
}
export default Page