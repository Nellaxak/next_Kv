import FooterBasket from '@/components/FooterBasket/page';
import http from '@/utils/http'

export interface Count {
  count: number;
}

async function Page() {
  const value = await http<Count>('http://localhost:3456/count') as Count;

  return (
    <FooterBasket valueCount={value.count} />
  )
}
export default Page