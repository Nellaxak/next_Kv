import ListRow from '@/components/ListRow/page';
import HeaderBottom from "@/components/HeaderBottom/page";
import styles from "./page.module.css";
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