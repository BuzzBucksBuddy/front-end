import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useExchangeStore = defineStore('exchange', () => {
  const route = useRoute()
  const API_URL = 'http://127.0.0.1:8000'

  const countryCategoryList = ref([
    {id:1, name: '아랍에미리트', title: 'AED'},
    {id:2, name: '호주', title: 'AUD'}, 
    {id:3, name: '바레인', title: 'BHD'},
    {id:4, name: '브루나이', title: 'BND'},
    {id:5, name: '캐나다', title: 'CAD'},
    {id:6, name: '스위스', title: 'CHF'},
    {id:7, name: '중국', title: 'CNH'},
    {id:8, name: '덴마크', title: 'DKK'},
    {id:9, name: '유럽연합', title: 'EUR'},
    {id:10, name:'영국', title: 'GBP'},
    {id:11, name:'홍콩', title: 'HKD'},
    {id:12, name: '인도네시아', title: 'IDR(100)'},
    {id:13, name: '일본', title: 'JPY(100)'},
    {id:14, name:'대한민국', title: 'KRW'},
    {id:15, name:'쿠웨이트', title: 'KWD'},
    {id:16, name:'말레이시아', title: 'MYR'},
    {id:17, name: '노르웨이', title: 'NOK'},
    {id:18, name: '뉴질랜드', title: 'NZD'},
    {id:19, name: '사우디아라비아', title: 'SAR'},
    {id:20, name: '스웨덴', title: 'SEK'},
    {id:21, name: '싱가포르', title: 'SGD'},
    {id:22, name: '태국', title: 'THB'},
    {id:23, name: '미국', title: 'USD'},
  ])

  const exchangeRateCategoryList = ref([
    {id:1, name: '송금받을 때', title: 'ttb'},
    {id:2, name: '송금보낼 때', title:'tts'}, 
    {id:3, name: '매매기준율', title:'deal_bas_r'}
  ])


  const exchangeRate = ref(null)
  const exchangeUnit = ref(null)
  const getCountryInfo = function(country, category) {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/exchanges/${country}/${category}/`
    })
      .then((res) => {
        console.log(res)
        exchangeRate.value = res.data.rate
        exchangeUnit.value = res.data.unit
      })
      .catch((err) => {
        console.log(err)
      })
  }



  const exchangeRateList = ref([])
  const getExchangeRate = function() {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/exchages/`
    })
      .then((res) => {
        console.log(res)
        // exchangeRateList.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }



  return { 
    API_URL, 
    countryCategoryList,
    exchangeRateCategoryList, 
    exchangeRate,
    exchangeUnit,
    getCountryInfo,
    exchangeRateList, 
    getExchangeRate 
  }
}, { persist: false })
