'use server'
import { revalidatePath, revalidateTag } from 'next/cache';
export async function addDeleteItem() {
    revalidateTag('records')
    //revalidatePath('/')//work
}
export async function updateCount() {
    revalidateTag('count')
    revalidateTag('status')
}
/*export async function updateStatus() {
    revalidateTag('status')
}*/