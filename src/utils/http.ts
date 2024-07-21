import Item from '@/types/Item'
import HttpResponse from '@/types/HttpResponse'
export default async function http<T>(
  request: RequestInfo,
): Promise<Item[] | unknown> {
  try {
    const response: HttpResponse<T> = await fetch(
      request, {
      cache: "no-store",
    });
    const parsedBody: T = await response.json();
    return parsedBody;
  }
  catch (err: unknown) {
    console.log('err', err)
  }
}