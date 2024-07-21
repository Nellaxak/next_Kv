import FooterBasket from '@/components/FooterBasket/page';
import HttpResponse from '@/types/HttpResponse'

export interface Count {
  count: number;
}
async function http<T>(
  request: RequestInfo,
): Promise<Count | unknown> {
  try {
    const response: HttpResponse<T> = await fetch(
      request, {
      cache: "no-store",
    });
    const parsedBody: Count = await response.json();
    return parsedBody;
  }
  catch (err: unknown) {
    console.log('err', err)
  }
}
async function Page() {
  const value = await http<Count>('http://localhost:3456/count') as Count;

  return (
    <FooterBasket valueCount={value.count} />
  )
}
export default Page