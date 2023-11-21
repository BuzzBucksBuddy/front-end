import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useExchangeStore = defineStore('exchange', () => {
  const route = useRoute()
  const API_URL = 'http://127.0.0.1:8000'

  const countryCategoryList = ref([
    {id:1, name: '노르웨이', title: 'NOK'},
    {id:2, name: '뉴질랜드', title: 'NZD'},
    {id:3, name:'대한민국', title: 'KRW'},
    {id:4, name: '덴마크', title: 'DKK'},
    {id:5, name:'말레이시아', title: 'MYR'},
    {id:6, name: '미국', title: 'USD'},
    {id:7, name: '바레인', title: 'BHD'},
    {id:8, name: '브루나이', title: 'BND'},
    {id:9, name: '사우디아라비아', title: 'SAR'},
    {id:10, name: '스웨덴', title: 'SEK'},
    {id:11, name: '스위스', title: 'CHF'},
    {id:12, name: '싱가포르', title: 'SGD'},
    {id:13, name: '아랍에미리트', title: 'AED'},
    {id:14, name:'영국', title: 'GBP'},
    {id:15, name: '유럽연합', title: 'EUR'},
    {id:16, name: '인도네시아', title: 'IDR(100)'},
    {id:17, name: '일본', title: 'JPY(100)'},
    {id:18, name: '중국', title: 'CNH'},
    {id:19, name: '캐나다', title: 'CAD'},
    {id:20, name:'쿠웨이트', title: 'KWD'},
    {id:21, name: '태국', title: 'THB'},
    {id:22, name: '호주', title: 'AUD'}, 
    {id:23, name:'홍콩', title: 'HKD'},
  ])

  const exchangeRateCategoryList = ref([
    {id:1, name: '송금받을 때', title: 'ttb'},
    {id:2, name: '송금보낼 때', title:'tts'}, 
    {id:3, name: '매매기준율', title:'deal_bas_r'}
  ])


  const exchangeRate = ref(null)
  const exchangeUnit = ref(null)
  const getCountryInfo = async function(country, category) {
    await axios({
      method: 'get',
      url: `${API_URL}/api/v1/exchanges/${country}/${category}/`
    })
      .then((res) => {
        console.log(res)
        exchangeRate.value = Number(res.data.rate)
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
      url: `${API_URL}/api/v1/exchanges/`
    })
      .then((res) => {
        console.log(res)
        // exchangeRateList.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 뉴스 크롤링
  const searchTitleResults = ref([])
  const searchLinkResults = ref([])
  const searchNews = function(keyword) {
    console.log('eeee')
    axios({
      method:'get',
      url: `${API_URL}/api/v1/exchanges/${keyword}/`,
    })
      .then((res) => {
      console.log(res)
      searchTitleResults.value = res.data.title_list
      searchLinkResults.value = res.data.link_list
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  //   try {
  //     const response = await axios.get(`/api/v1/exchanges/news/${keyword}/`)
  //     const data = response.data || []  // 데이터가 배열이 아니면 빈 배열로 설정
  //     store.setSearchResults(data)
  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching news:', error)
  //     return []
  //   }
  // }


  return { 
    API_URL, 
    countryCategoryList,
    exchangeRateCategoryList, 
    exchangeRate,
    exchangeUnit,
    getCountryInfo,
    exchangeRateList, 
    getExchangeRate, 
    searchTitleResults,
    searchLinkResults,
    searchNews,
  }
}, { persist: false })
