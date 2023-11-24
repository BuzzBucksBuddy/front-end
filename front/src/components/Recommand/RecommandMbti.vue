<template>
  <div class="top-box">
    <h2>{{ store.myProfile.mbti }}들은 이걸 가입했어요</h2>
    <div class="mbti-dep-box">
      <div class="items">
        <h3>예금</h3>
        <RecommandDepMbti
          v-for="(prod, idx) in depMbti"
          :key="prod.id"
          :prod-id="prod.id"
          :idx="idx"
        />
      </div>
      <div class="items">
        <h3>적금</h3>
        <RecommandSavMbti
          v-for="(prod, idx) in savMbti"
          :key="prod.id"
          :prod-id="prod.id"
          :idx="idx"
        />
      </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import RecommandDepMbti from '@/components/Recommand/RecommandDepMbti.vue'
import RecommandSavMbti from '@/components/Recommand/RecommandSavMbti.vue'
import axios from 'axios'

const router = useRouter()
const store = useLoginStore()
const myProfile = ref([])
onMounted(()=>{
  store.getProfile()
  store.myProfile
  usersMbti()
})

const API_URL = 'http://127.0.0.1:8000/api/v1'

const depMbti = ref([])
const savMbti = ref([])

const usersMbti = function () {
  axios({
    method: 'get',
    url: `${API_URL}/accounts/users_mbti/${store.myProfile.mbti}/`,
    headers: {
      Authorization: `Token ${store.token}`
    }
  })
  .then ((res) => {
    console.log(res.data)
    depMbti.value = res.data.most_financial_options_dep
    savMbti.value = res.data.most_financial_options_sav
  })
  .catch((err) => {
    console.log('favorit 추천 오류', err)
  })
}


</script>

<style scoped>
.top-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mbti-dep-box {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.item {
  width: 40%;
}
h2 {
  font-size: 28px;
  margin-top: 24px;
}
h3 {
  font-size: 22px;
}
</style>