<script setup>
</script>
<template>
    <header>
        <img src="@/assets/logo.jpeg" height="75"  alt="H.Sプロフィールページ">
        <nav>
          <router-link class="nav-link" to="/" exact active-class="link--active" >Top</router-link>
          <router-link class="nav-link" to="about" active-class="link--active" >About</router-link>
          <router-link class="nav-link" to="works" active-class="link--active" >Works</router-link>
          <router-link class="nav-link" to="contact" active-class="link--active" >Contact</router-link>
          <router-link class="nav-link" to="login" active-class="link--active" >Admin</router-link>
        </nav>
  </header>
  <router-view></router-view>
</template>
<style scoped>
header{
  display: flex;
  border-bottom: 1px solid #dcd9d9;
  }
nav{
  width: 100%;
  height :75px;
  display: flex;
  justify-content: space-around;
}
.nav-link{
  color: black;
  opacity: .5;
  list-style: none;
  margin: auto 0;
}
.router-link-exact-active{
  font-size: 20px;
  opacity: 1;
  border-bottom: 1px solid;
}
a:hover {
  color: aqua;
}
a {
color:inherit;
 text-decoration: none;
}
img{
  border-radius: 10px;
}
</style>