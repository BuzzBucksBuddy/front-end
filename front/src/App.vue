<template>
  <div id="app">
    <nav :class="['up-down', {'nav-narrow': !switcher}]">
      <section>
        <div class="d-flex gap-2">
          <img src="@/assets/image/logo.png" alt="logo" id="logo">
          <!-- 동전! -->
            <button
              v-if="showButton"
              :style="{ top: buttonTop + 'px', left: buttonLeft + 'px' }"
              @click="handleButtonClick"
              ref="rollingButton hey"
              :class="[{ bounce: isBouncing }, 'coin-btn','btn-confetti']"
            >
              <i class="fa-solid fa-coins fa-2xl" style="color: #f53277;"></i>
            </button>
          
          <p>Mileage: {{ mileage }}</p>
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
          <div @click="routerTo('SignUp')" class="log-btn">
            <RouterLink :to="{ name: 'SignUp' }">SignUp</RouterLink>
          </div>
          <div @click="routerTo('LogIn')" class="log-btn">
            <RouterLink :to="{ name: 'LogIn' }">LogIn</RouterLink>
          </div>
        </div>
        <div class="user-info" v-else>
          <div @click="routerTo('Profile')" :class="[{active: $route.name === 'Profile', 'nav-item-narrow': !switcher}, 'nav-item']">
            <i class="fa-solid fa-user"></i>
            <p :class="{'name-narrow': !switcher, 'name-wide': switcher}">{{ loginStore.myName }}</p>
          </div>
          <div @click="loginStore.logOut" class="log-btn">
            <a>LogOut</a>
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
import confetti from "https://esm.run/canvas-confetti@1"


const loginStore = useLoginStore()
const router = useRouter()
onMounted(() => {
  loginStore.userInfo()
  // 동전
  loginStore.getProfile()
  mileage.value = loginStore.myProfile.mileage
  setInterval(() => {
    showButton.value = !showButton.value;
    if (showButton.value) {
      randomizeButtonPosition()
    }
  }, 10000)
})


const switcher = ref(true)

const routerTo = function (name) {
  router.push({ name: name })
}



// 동전
const hey = ref(null)
const isBouncing = ref(false)

// ** 마일리지 랜덤 버튼
const showButton = ref(false)
const buttonTop = ref(0)
const buttonLeft = ref(0)
const mileage = ref(0)

// const mileage = computed(() => {
//   // loginStore.getProfile()
//   return loginStore.myProfile.mileage
// })

// 터지기 반응형
const generateConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 20,
  })
}

function handleButtonClick() {
  generateConfetti()
  isBouncing.value = !isBouncing.value
  mileage.value += 1
  loginStore.addMileage(mileage)
  showButton.value = false
}

function randomizeButtonPosition() {
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth
  const buttonSize = 50

  buttonTop.value = Math.floor(Math.random() * (windowHeight - buttonSize))
  buttonLeft.value = Math.floor(Math.random() * (windowWidth - buttonSize))
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
  margin-bottom: 20px;
}
h1 {
  margin: 0;
}
h4 {
  margin: 0;
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
.log-btn {
  background-color: var(--sub-color);
  width: 100%;
  height: 90px;
  margin: 4px 0;
  padding: 4px 20px;
  border-radius: 45px;
  cursor: pointer;
}
.log-btn a {
  text-decoration: none;
  color: white;
  font-size: 16px;
}
.log-btn:hover a {
  color: var(--main-color);
}

/* 동전 */

.bounce {
  animation: bounce-animation 0.6s ease-in-out;
}

@keyframes bounce-animation {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.coin-btn {
  position:absolute;
  border: none;
  background-color: transparent;
  border-radius: 30px;
  height: 50px;
  width: 50px;
}

body {
  background-color: #f5f8ff;
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
  min-height: 100vh;
  display: grid;
  place-items: center;
}

.btn-like {
  cursor: pointer;
  font: inherit;
  margin: 0;
  padding: 0;
}
.btn-confetti {
  /* background-color: #404663; */
  color: #ffffff00;
  border: 0;
  font-size: 2em;
  font-weight: 100;
  padding: 0.5em 1.25em;
  /* border-radius: 0.5em; */
  z-index: 999;
  position: relative;
  display: flex;
  gap: 0.5em;
  /* box-shadow:
    0px 1.7px 2.2px rgba(0, 0, 0, 0.02),
    0px 4px 5.3px rgba(0, 0, 0, 0.028),
    0px 7.5px 10px rgba(0, 0, 0, 0.035),
    0px 13.4px 17.9px rgba(0, 0, 0, 0.042),
    0px 25.1px 33.4px rgba(0, 0, 0, 0.05),
    0px 60px 80px rgba(0, 0, 0, 0.07); */
}

.btn-confetti:active {
  transform: scale(1.01);
}

</style>