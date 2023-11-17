import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// https://juso.dev/docs/reg-code-api/

export const useMapStore = defineStore('map', () => {
  const doList = ref([])
  const guList = ref([])
  const bankList = ref([
    '국민은행',
    '신한은행',
    '농협'
  ])

  const doLoader = function () {
    axios({
      method: 'get',
      url: 'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000'
    })
      .then((res) => {
        console.log(res.data)
        doList.value = res.data.regcodes
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const guLoader = function (code) {
    console.log(code)
    const doCode = code.slice(0, 2)
    axios({
      method: 'get',
      url: `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${doCode}*00000&is_ignore_zero=true`
    })
      .then((res) => {
        console.log(res.data)
        guList.value = res.data.regcodes
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return { doLoader, doList, guLoader, guList, bankList }
}, { persist: false })
