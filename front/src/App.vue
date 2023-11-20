<template>
  <div id="app">
    <nav :class="{'nav-narrow': !switcher}">
      <i id="switcher" :class="[{'nav-item-narrow': !switcher}, 'nav-item']" @click="switcher = !switcher" class="fa-solid fa-bars"></i>
      <div @click="routerTo('Home')" :class="[{active: $route.name === 'Home', 'nav-item-narrow': !switcher}, 'nav-item']">
        <i class="fa-solid fa-house"></i>
        <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">Home</p>
      </div>
      <div @click="routerTo('Profile')" :class="[{active: $route.name === 'Profile', 'nav-item-narrow': !switcher}, 'nav-item']">
        <i class="fa-solid fa-user"></i>
        <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">Profile</p>
      </div>
      <div @click="routerTo('ProductList')" :class="[{active: $route.name === 'ProductList', 'nav-item-narrow': !switcher}, 'nav-item']">
        <i class="fa-solid fa-coins"></i>
        <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">Products</p>
      </div>
      <div @click="routerTo('ExchangeRate')" :class="[{active: $route.name === 'ExchangeRate', 'nav-item-narrow': !switcher}, 'nav-item']">
        <i class="fa-solid fa-arrow-right-arrow-left"></i>
        <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">Exchange</p>
      </div>
      <div @click="routerTo('BankMap')" :class="[{active: $route.name === 'BankMap', 'nav-item-narrow': !switcher}, 'nav-item']">
        <i class="fa-solid fa-map"></i>
        <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">BankMap</p>
      </div>
      <div @click="routerTo('ArticleList')" :class="[{active: $route.name === 'ArticleList', 'nav-item-narrow': !switcher}, 'nav-item']">
        <i class="fa-solid fa-newspaper"></i>
        <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">Article</p>
      </div>
    </nav>
    <main class="nav-active" :class="{'nav-disactive': !switcher}">
      <header>
        <h1>BBB</h1>
        <div class="user-info" v-if="!loginStore.isLogin">
          <h4>로그인 해주세요</h4>
          <div class="log-link">
            <RouterLink :to="{ name: 'SignUp' }">SignUp</RouterLink>
            <RouterLink :to="{ name: 'LogIn' }">LogIn</RouterLink>
          </div>
        </div>
        <div class="user-info" v-else>
          <h4>{{ loginStore.myName }}</h4>
          <div class="log-link">
            <a @click="loginStore.logOut">LogOut</a>
          </div>
        </div>
      </header>
      <hr>
      <section class="container">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import { ref, onMounted, computed } from 'vue'

const loginStore = useLoginStore()
const router = useRouter()
onMounted(() => {
  loginStore.userInfo()
})

const switcher = ref(true)

const routerTo = function (name) {
  router.push({ name: name })
}
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 720px) {
  nav {
    width: 150px;
  }
  main {
    width: 100%;
  }
  .nav-active {
    margin-left: 160px;
    margin-right: 10px;
  }
  .nav-narrow {
    width: 60px;
  }
  .nav-disactive {
    margin-left: 70px;
    margin-right: 10px;
  }
}
@media screen and (min-width: 720px) {
  nav {
    width: 150px;
  }
  main {
    width: 580px;
  }
  .nav-active {
    margin-left: 150px;
  }
  .nav-narrow {
    width: 60px;
  }
  .nav-disactive {
    margin-left: 60px;
  }
}
@media screen and (min-width: 960px) {
  nav {
    width: 180px;
  }
  main {
    width: 760px;
  }
  .nav-active {
    margin-left: 180px;
  }
  .nav-narrow {
    width: 80px;
  }
  .nav-disactive {
    margin-left: 80px;
  }
}
@media screen and (min-width: 1400px) {
  nav {
    width: 220px;
  }
  main {
    width: 960px;
  }
  .nav-active {
    margin-left: 220px;
  }
  .nav-narrow {
    width: 100px;
  }
  .nav-disactive {
    margin-left: 100px;
  }
}
@media screen and (min-width: 1920px) {
  nav {
    width: 240px;
  }
  main {
    width: 1200px;
  }
  .nav-active {
    margin-left: 240px;
  }
  .nav-narrow {
    width: 100px;
  }
  .nav-disactive {
    margin-left: 100px;
  }
}
nav {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 2px;
  border-right: 1px solid rgb(224, 214, 192);
  transition: all 0.5s;
}
.container {
  width: 100%;
}
main {
  transition: all 0.5s;
}
.nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.5s;
  border-radius: 8px;
  margin-bottom: 4px;
}
.nav-item-narrow {
  justify-content: center;
  flex-direction: column;

}
.nav-item p {
  text-decoration: none;
  color: black;
}
.nav-item:hover {
  background-color: rgb(255, 235, 191);
}
.active {
  background-color: rgb(255, 235, 191);
}
.active:hover {
  background-color: rgb(255, 221, 158);
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-info {
  width: 160px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding: 0px 10px;
}
h1 {
  margin: 0;
}
h4 {
  margin: 0;
}
.log-link a {
  text-decoration: none;
  color: black;
  margin-left: 10px;
  cursor: pointer;
}
.log-link a:hover {
  color: rgb(242, 185, 60);
}
hr {
  margin: 0;
}
.name-narrow {
  font-size: 11px;
  margin: 0;
  margin-top: 2px;
}
.name-wide {
  margin-left: 12px;
}
</style>