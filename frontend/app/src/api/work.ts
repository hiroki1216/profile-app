import { useFetch } from '@vueuse/core'
import { Work } from '../types/work'
const url ="https://example.com";
async function createWork(params: Work){
  //if you want to customize useFetch() see:https://vueuse.org/core/useFetch/#creating-a-custom-instance
  const { isFetching, error, data } = await useFetch(url)
  .post({
    ...params
  })
  .json();  
  if (isFetching){
    console.log("Postが完了しました");
  }
  if (error.value !== null){
    throw new Error(error.value);
  }
  return data;
}