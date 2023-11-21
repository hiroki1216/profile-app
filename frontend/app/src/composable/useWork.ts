import {ref, Ref} from 'vue';
import { Work, Works } from '../types/work';
import { useFetch } from '@vueuse/core'
 
export default function useAbout(){
  const work: Ref<Work> = ref({
    projectName: "",
    language: "",
    framework: "",
    tool: "",
    introduction: "",
    responsible: "",
    acquiredSkill: "",
  })
  const works: Ref<Works> = ref(
    {
      works: []
    }
  );
  
  async function getWorks(){
    const url ="http://localhost:8080/works";
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

  async function getWork(id: any){
    const url =`http://localhost:8080/work/${id}`;
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

  async function createWork(params: Work){
    const url ="http://localhost:8080/new/work";
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
      console.log(error.value);
      throw new Error(error.value);
    }
    return data;
  }

  async function updateWork(params: Work, id: any){
    const url =`http://localhost:8080/edit/work/${id}`;
    //if you want to customize useFetch() see:https://vueuse.org/core/useFetch/#creating-a-custom-instance
    const { isFetching, error, data } = await useFetch(url)
    .put({
      ...params,
    })
    .json();  
    if (isFetching){
      console.log("Putが完了しました");
    }
    if (error.value !== null){
      console.log(error.value);
      throw new Error(error.value);
    }
    return data;
  }

  async function deleteWork(params: Work, id: any){
    const url =`http://localhost:8080/delete/work/${id}`;
    //if you want to customize useFetch() see:https://vueuse.org/core/useFetch/#creating-a-custom-instance
    const { isFetching, error, data } = await useFetch(url)
    .delete({
      ...params,
    })
    .json();  
    if (isFetching){
      console.log("Deleteが完了しました");
    }
    if (error.value !== null){
      console.log(error.value);
      throw new Error(error.value);
    }
    return data;
  }

  return {
    work,
    works,
    getWorks,
    getWork,
    createWork,
    updateWork,
    deleteWork,
  };
}