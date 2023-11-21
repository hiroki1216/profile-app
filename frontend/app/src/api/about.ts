import { useFetch } from '@vueuse/core'
import { About } from '../types/about'
const url ="https://example.com";
async function createAbout(params: About){
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
export default {
  createAbout
}
