<template>
    <div class="card text-bg-light options">
      <div class="card-body">
        <div :class="{'unable': !isJoinedOption && isJoinedProduct}">
          <h6 class="card-title">저축 기간: {{ option.save_trm }}개월</h6>
          <p class="card-text">저축 금리 유형: {{ option.intr_rate_type_nm }}</p>
          <p class="card-text">저축 금리: {{ option.intr_rate }}</p>
          <p class="card-text">최고 우대 금리: {{ option.intr_rate2 }}</p>
          <p v-if="option.rsrv_type === 'S'"><span class="position-absolute top-0 start-80 translate-middle badge text-bg-primary">{{ option.rsrv_type_nm }}</span></p>
          <p v-if="option.rsrv_type === 'F'"><span class="position-absolute top-0 start-80 translate-middle badge text-bg-success">{{ option.rsrv_type_nm }}</span></p>

          <div class="btn-zone">
            <div v-if="isJoinedOption && isJoinedProduct">
              <button class="btn buttons" @click="joinOption(optionId)">가입 취소</button>
            </div>
            <div v-else-if="!isJoinedOption && !isJoinedProduct">
              <button class="btn buttons" @click="joinOption(optionId)">가입하기</button>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/login'
import { useProductStore } from '@/stores/product'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

onMounted(() => {
  if (loginStore.isLogin) {
    loginStore.getProfile()
  }
  makeJoined()
})

const router = useRouter()
const loginStore = useLoginStore()
const productStore = useProductStore()
const props = defineProps({
  option: Object,
  type: String
})

const type = props.type
const optionId = ref(null)
const optionPrdt = ref(null)

optionId.value = props.option.id
optionPrdt.value = props.option.fin_prdt_cd

const myProfile = computed(()=>{
  return loginStore.myProfile
})

//가입하기
const joinOption = function (optionId) {
  if (loginStore.isLogin) {
    if (type === 'dep') {
      axios({
        method: 'post',
        url: `${productStore.API_URL}/deposit-options/${optionId}/join/`,
        headers: {
          Authorization: `Token ${loginStore.token}`
        }
      })
        .then((res) => {
          console.log(res)
          loginStore.getProfile()
          makeJoined()
          emit('updatePlz')
          // getDepProduct(route.params.productId)
          // joiners(route.params.productId)
          // console.log(isJoined.value)
          router.push({'name': 'ProductList'})
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (type === 'sav') {
      axios({
        method: 'post',
        url: `${productStore.API_URL}/saving-options/${optionId}/join/`,
        headers: {
          Authorization: `Token ${loginStore.token}`
        }
      })
        .then((res) => {
          console.log(res)
          loginStore.getProfile()
          makeJoined()
          emit('updatePlz')
          // getSavProduct(route.params.productId)
          // joiners(route.params.productId)
          router.push({'name': 'ProductList'})
        })
        .catch((err) => {
          console.log(err)
        })
    }
  } else {
    window.alert('로그인이 필요합니다.')
    const response = window.confirm('로그인 하시겠습니까?')
    if (response) {
      router.push({ name: 'LogIn'})
    }
  }
}

const emit = defineEmits('updatePlz')

// 가입 여부 확인
const joinedProducts = ref([])
const joinedOptions = ref([])

const isJoinedOption = computed(() => {
  console.log(myProfile.value.length)
  if (joinedOptions.value.length == 0) {
    return false
  } else {
    if (joinedOptions.value.includes(optionId.value)) {
      return true
    } else {
      return false
    }
  }
})

const isJoinedProduct = computed(() => {
  console.log(myProfile.value.length)
  if (joinedProducts.value.length == 0) {
    return false
  } else {
    if (joinedProducts.value.includes(optionPrdt.value)) {
      return true
    } else {
      return false
    }
  }
})

const makeJoined = function () {
  if (myProfile.length > 0) {
    console.log('makeList')
    if (type === 'dep') {
      myProfile.value.financial_options_dep.forEach((option) => {
        if (!joinedOptions.value.includes(option.id)) {
          joinedOptions.value.push(option.id)
        }
        if (!joinedProducts.value.includes(option.fin_prdt_cd)) {
          joinedProducts.value.push(option.fin_prdt_cd)
        }
      })
    } else if (type === 'sav') {
      myProfile.value.financial_options_sav.forEach((option) => {
        if (!joinedOptions.value.includes(option.id)) {
          joinedOptions.value.push(option.id)
        }
        if (!joinedProducts.value.includes(option.fin_prdt_cd)) {
          joinedProducts.value.push(option.fin_prdt_cd)
        }
      })
    }
  }
}

</script>

<style scoped>
.card-body {
  padding: 30px;
}

button {
  cursor: pointer;
}

.buttons {
  background-color: var(--main-color);
}

.options {
  width: 440px;
}

.btn-zone {
  float: right;
}

h4 {
  margin: 0;
}
.unable {
  color: rgb(179, 179, 179);
}
</style>