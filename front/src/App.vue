<template>
  <div id="app">
    <nav :class="['up-down', {'nav-narrow': !switcher}]">
      <section>
        <div>
          <img src="@/assets/image/logo.png" alt="logo" id="logo">
        </div>
        <i id="switcher" :class="[{'nav-item-narrow': !switcher}, 'nav-item']" @click="switcher = !switcher" class="fa-solid fa-bars"></i>
        <div @click="routerTo('Home')" :class="[{active: $route.name === 'Home', 'nav-item-narrow': !switcher}, 'nav-item']">
          <i class="fa-solid fa-house"></i>
          <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">홈</p>
        </div>
        <div @click="routerTo('Recommand')" :class="[{active: $route.name === 'Recommand', 'nav-item-narrow': !switcher}, 'nav-item']">
          <i class="fa-solid fa-gift"></i>
          <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">추천</p>
        </div>
        <div @click="routerTo('ProductList')" :class="[{active: $route.name === 'ProductList', 'nav-item-narrow': !switcher}, 'nav-item']">
          <i class="fa-solid fa-coins"></i>
          <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">예적금 찾기</p>
        </div>
        <div @click="routerTo('ExchangeRate')" :class="[{active: $route.name === 'ExchangeRate', 'nav-item-narrow': !switcher}, 'nav-item']">
          <i class="fa-solid fa-arrow-right-arrow-left"></i>
          <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">환율</p>
        </div>
        <div @click="routerTo('BankMap')" :class="[{active: $route.name === 'BankMap', 'nav-item-narrow': !switcher}, 'nav-item']">
          <i class="fa-solid fa-map"></i>
          <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">은행 찾기</p>
        </div>
        <div @click="routerTo('ArticleList')" :class="[{active: $route.name === 'ArticleList', 'nav-item-narrow': !switcher}, 'nav-item']">
          <i class="fa-solid fa-newspaper"></i>
          <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">게시판</p>
        </div>
      </section>
      <section>
        <div class="user-info" v-if="!loginStore.isLogin">
          <div class="log-link">
            <RouterLink :to="{ name: 'SignUp' }">SignUp</RouterLink>
            <RouterLink :to="{ name: 'LogIn' }">LogIn</RouterLink>
          </div>
        </div>
        <div class="user-info" v-else>
          <div @click="routerTo('Profile')" :class="[{active: $route.name === 'Profile', 'nav-item-narrow': !switcher}, 'nav-item']">
            <i class="fa-solid fa-user"></i>
            <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">{{ loginStore.myName }}</p>
          </div>
          <div class="log-link">
            <a @click="loginStore.logOut">LogOut</a>
          </div>
        </div>
      </section>
    </nav>
    <main class="nav-active" :class="{'nav-disactive': !switcher}">
      <section class="container">
        <RouterView
          id="wrapper"
        />
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
#logo {
  width: 80px;
  margin-left: 8px;
  margin-bottom: 8px;
}
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
    width: 220px;
  }
  main {
    width: 1200px;
  }
  .nav-active {
    margin-left: 240px;
  }
  .nav-narrow {
    width: 108px;
  }
  .nav-disactive {
    margin-left: 100px;
  }
}
nav {
  z-index: 99;
  background-color: var(--main-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 4px;
  border-right: 4px solid var(--sub-color);
  transition: all 0.5s;
}
.up-down {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  border-radius: 16px;
  margin-bottom: 4px;
}
.nav-item-narrow {
  justify-content: center;
  flex-direction: column;

}
.nav-item p {
  text-decoration: none;
  font-weight: 700;
  /* color: black; */
  white-space: nowrap;
}
.nav-item:hover {
  background-color: var(--sub-color);
  color: white;
}
.active {
  background-color: var(--main-color);
  border: 4px solid var(--sub-color);
}
.active:hover {
  background-color: var(--sub-color);
}
.user-info {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0px 10px;
}
h1 {
  margin: 0;
}
h4 {
  margin: 0;
}
.log-link {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
}
.log-link a {
  text-decoration: none;
  color: black;
  margin-left: 10px;
  cursor: pointer;
}
.log-link a:hover {
  color: var(--main-color);
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