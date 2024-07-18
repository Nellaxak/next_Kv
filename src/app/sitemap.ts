import { MetadataRoute, Metadata } from 'next';
import ItemFull from '@/types/ItemFull'

export default async function sitemap():
 Promise<MetadataRoute.Sitemap>{
const res = await fetch('http://localhost:3456/', {
    cache: "no-store",//add, delete list item
  }
  );
  const items:ItemFull[] = await res.json()
  //const items = await res.json()
  //console.log('sitemap items',items)
const itemEntries: MetadataRoute.Sitemap=
items.map(({id})=>({url:`process.env.NEXT_PUBLIC_BASE_URL/items/${id}`}))

return [
    {url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
//lastModified: new Date()
},
...itemEntries];
}
