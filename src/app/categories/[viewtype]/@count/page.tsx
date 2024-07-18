import FooterBasket from '@/components/FooterBasket/page';
//import FooterMobile from '@/components/FooterMobile/page';

export interface Count {
  count: number;
}
async function Page({ params }) {
  const viewtype: string = params.viewtype

  const res = await fetch('http://localhost:3456/count', {
    cache: "no-store"
  });
  const value: Count = await res.json()
  return (
    <FooterBasket valueCount={value.count} />
  )
}
export default Page