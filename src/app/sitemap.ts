import { MetadataRoute, Metadata } from 'next';
const URL = 'http://localhost:3001'
//"https://claritydev.net";
export default async function sitemap():
 Promise<MetadataRoute.Sitemap>{
const res = await fetch('http://localhost:3456/', {
    cache: "no-store",//add, delete list item
  }
  );
  //const items:ItemsResponse = await res.json()
  const items = await res.json()
const itemEntries: MetadataRoute.Sitemap=
items.map(({id})=>({url:`process.env.NEXT_PUBLIC_BASE_URL/items/${id}`}))

return [
    {url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
//lastModified: new Date()
},
...itemEntries];
}
/*const generateSiteMap = ({ data }) => {
    const posts = []
    for (const i in data) {
        posts.push(data[i])
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        return '<url>
            <loc>${URL}</loc>
        </url>'
        $(posts && posts.map(item=>{
            return '<url><loc>${`${URL}/blog/${item.id}`}</loc></url>'
        }))
    </urlset>`
}
export default async function ItemsPostPage(params,res){//{params}
    console.log('sitemap params',res,params)
    // fetch data
    const items = await fetch(`http://localhost:3456/`,
    ).then((res) => res.json())
    console.log('items sitemap',items.length)
    const sitemap = generateSiteMap(items);
}*/