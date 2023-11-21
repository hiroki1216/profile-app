import {ref, Ref} from 'vue';
import { About } from '../types/about';
import { useFetch } from '@vueuse/core'

export default function useAbout(){
  const about: Ref<About> = ref({
    name: "",
    introduction: "",
    certification: "",
    speciality: "",
    experiences: "",
    strength: "",
  })

  async function getAbout(){
    const url ="http://localhost:8080/about";
    //if you want to customize useFetch() see:https://vueuse.org/core/useFetch/#creating-a-custom-instance
    const { isFetching, error, data } = await useFetch(url)
    .get()
    .json();
    if (isFetching){
      console.log("GETが完了しました");
    }
    if (error.value !== null){
      console.log(error.value);
      throw new Error(error.value);
    }
    console.log(data.value);
    return data;
  }

  async function createAbout(params: About){
    const url ="http://localhost:8080/new/about";
    //if you want to customize useFetch() see:https://vueuse.org/core/useFetch/#creating-a-custom-instance
    const { isFetching, error, data } = await useFetch(url)
    .post({
      ...params
    })
    .json();  
    if (isFetching){
      console.log("POSTが完了しました");
    }
    if (error.value !== null){
      console.log(error.value);
      throw new Error(error.value);
    }
    return data;
  }

  async function updateAbout(params: About){
    const url ="http://localhost:8080/edit/about";
    //if you want to customize useFetch() see:https://vueuse.org/core/useFetch/#creating-a-custom-instance
    const { isFetching, error, data } = await useFetch(url)
    .put({
      ...params
    })
    .json();  
    if (isFetching){
      console.log("POSTが完了しました");
    }
    if (error.value !== null){
      console.log(error.value);
      throw new Error(error.value);
    }
    return data;
  }
  return {
    about,
    getAbout,
    createAbout,
    updateAbout,
  }; 
}