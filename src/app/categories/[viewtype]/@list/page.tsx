import ListRow from '@/components/ListRow/page';
import HeaderBottom from "@/components/HeaderBottom/page";
import styles from "./page.module.css";
import Item from '@/types/Item'

async function Page({ params }) {
  const viewtype: string = params.viewtype
  const res = await fetch(`http://localhost:3456/${viewtype}`, {
    cache: "no-store",
  }
  );
  const items: Item[] = await res.json()
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