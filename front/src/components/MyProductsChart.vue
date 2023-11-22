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
import { createPinia } from 'pinia'
import { useLoginStore } from '@/stores/login'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const token = computed(() => {
  const store = useLoginStore()
  return store.token
})

export default defineComponent({
  name: 'BarChart',
  components: { Bar },
  setup() {
    const store = useLoginStore()
    const loaded = ref(false)
    const chartData = ref(null)

    onMounted(async () => {
      loaded.value = false

      try {
        const res = await axios.get(`${store.API_URL}/api/v1/accounts/my_intr_rate_graph/`, {
          headers: {
            Authorization: `Token ${token.value}`
          }
        });

        console.log(res.data, '333');
        chartData.value = {
          labels: res.data.product_names,
          datasets: [
            {
              label: 'Interest Rate',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              data: res.data.intr_rates
            },
            {
              label: 'Interest Rate2',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              data: res.data.intr_rates2
            }
          ]
        };
        loaded.value = true;
      } catch (err) {
        console.log('가입 상품 가져오기 오류', err);
      }
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
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
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    };

    return {
      loaded,
      chartData,
      chartOptions
    };
  }
});
</script>



<!-- <template>
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
import { useLoginStore } from '@/stores/login'
import { useStore } from 'pinia'

const store = useLoginStore()
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null
  }),
  mounted() {
    this.loaded = false

    axios({
      method: 'get',
      url: `${store.API_URL}/api/v1/accounts/my_intr_rate_graph/`,
      headers: {
        Authorization: `Token ${store.token.value}`
      }
    })
      .then((res) => {
        console.log(res.data);
        this.chartData = {
          labels: res.data.product_names,
          datasets: [
            {
              label: 'Interest Rate',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              data: res.data.intr_rates
            },
            {
              label: 'Interest Rate2',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              data: res.data.intr_rates2
            }
          ]
        }
        this.loaded = true;
      })
      .catch((err) => {
        console.log('가입 상품 가져오기 오류', err)
      })
  },
  computed: {
    chartOptions() {
      {
        return {
          responsive: true,
          maintainAspectRatio: false,
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
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      }
    }
  }
}  


</script>

<style scoped>

</style>
 -->
