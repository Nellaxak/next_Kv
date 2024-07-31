import HttpResponse from '@/types/HttpResponse'
var StreamReader = require('@/utils/StreamReader.js')

export default async function http<T>(
  request: RequestInfo,
): Promise<T | unknown> {
  try {
    const response: HttpResponse<T> = await fetch(
      request, {
      cache: "no-store",
    });
    const parsedBody: T = await StreamReader(response)
    //await response.json();
    return parsedBody;
  }
  catch (err: unknown) {
    console.log('err', err)
  }
}