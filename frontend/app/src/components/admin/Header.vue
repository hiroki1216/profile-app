<script setup>
import { ref } from 'vue';

const isNavHidden = ref(true);

const hiddenNav = () => {
  isNavHidden.value = !isNavHidden.value;
};
</script>
<template>
  <header class="sticky top-0 z-50">
    <nav class="flex items-center justify-between flex-wrap bg-pink-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <img src="@/assets/logo.png" class="fill-current h-8 w-8 mr-2" width="54" height="54" alt="H.Sプロフィールページアイコン">
        <span class="font-semibold text-xl tracking-tight">H.S Profile Page</span>
      </div>
      <div class="block lg:hidden">
        <button @click="hiddenNav" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"  :class="{ 'hidden': isNavHidden }">
        <div class="text-sm lg:flex-grow">
          <router-link class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/admin" exact active-class="link--active" >Top</router-link>
          <router-link class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/admin/about" active-class="link--active" >About編集</router-link>
          <router-link class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/admin/work/new" active-class="link--active" >Works作成</router-link>
        </div>
        <div>
          <router-link class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" to="/admin/logout" active-class="link--active" >ログアウト</router-link>
        </div>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template>