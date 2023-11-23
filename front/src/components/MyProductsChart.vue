<template>
  <div>
    <div>
      <bar :data="chartData" :options="chartOptions" v-if="loaded" />
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import axios from 'axios'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { createPinia } from 'pinia'
import { useLoginStore } from '@/stores/login'
import { useProductStore } from '@/stores/product'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const token = computed(() => {
  const LoginStore = useLoginStore()
  return LoginStore.token
})



export default defineComponent({
  name: 'BarChart',
  components: { Bar },
  setup() {
    const ProductStore = useProductStore()
    const LoginStore = useLoginStore()
    const loaded = ref(false)
    const chartData = ref(null)
    const router = useRouter()
    const goDetail = ref([])

    // const goDetail = computed(()=>{
    //   return ProductStore.go
    // })

    onMounted(async () => {
      loaded.value = false
      // goDetail.value = null

      try {
        const res = await axios.get(`${LoginStore.API_URL}/api/v1/accounts/my_intr_rate_graph/`, {
          headers: {
            Authorization: `Token ${token.value}`
          },
        })

        console.log(res.data, '333');
        chartData.value = {
          labels: res.data.product_names,
          datasets: [
            {
              label: '기본 금리',
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(56, 189, 221, 0.9)',
              hoverBackgroundColor: 'mediumturquoise',
              hoverBorderWidth:2,
              data: res.data.intr_rates
            },
            {
              label: '우대금리',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 0.9)',
              hoverBackgroundColor: 'hotpink',
              borderWidth: 2,
              data: res.data.intr_rates2
            }
          ]
        };
        loaded.value = true;
      } catch (err) {
        console.log('가입 상품 가져오기 오류', err)
      }
    })

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      height: 400,
      scales: {
        x: {
          grid: {
            display: true
          }
        },
        y: {
          grid: {
            display: true
          },
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            callback: function (value, index, values) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          boxWidth: 1,
          boxHeight:1,
          padding: 3
        },
        
      },
      // 바 클릭 -> 상품 디테일로 고
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const clickedBarIndex = elements[0].index
          const clickedLabel = chartData.value.labels[clickedBarIndex]
          // console.log(clickedLabel)
          
          axios({
            method : 'get',
            url: `${ProductStore.API_URL}/goDetail/${clickedLabel}/`,
          })
          .then((res) => {
            console.log(res.data,'여기@')
            goDetail.value = res.data
            router.push({name:'ProductDetail', params:{type: goDetail.value.type, productId: goDetail.value.productId}})   
          })
          .catch((err) => {
            console.log(err)
          })
          
          
        }
      }
    }

    return {
      ProductStore,
      loaded,
      chartData,
      chartOptions,
      router,
      goDetail,
    }
  }
})

</script>



<style scoped>

</style>

