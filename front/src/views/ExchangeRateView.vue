<template>
  <div>
    <h1>Exchange Rate View</h1>
    <ExchangeRateCalculator @country-changed="handleCountryChange" />
    <ExchangeRateNews :country="currentCountry"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ExchangeRateCalculator from '@/components/ExchangeRateCalculator.vue'
import ExchangeRateNews from '@/components/ExchangeRateNews.vue'

const currentCountry = ref('')

const handleCountryChange = (newCountry) => {
  console.log('Selected country:', newCountry)
  // 원하는 작업 수행...
  currentCountry.value = newCountry
}
</script>

<style scoped>

</style>