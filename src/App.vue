<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountryStore } from './stores/country'
import CountryListing from './components/CountryListing.vue'
import CountryTopHeader from './components/CountryTopHeader.vue'

const countryStore = useCountryStore()

const { fetchCountries } = countryStore

onMounted(() => {
  fetchCountries()
})
</script>

<template>
  <div
    class="position-relative d-flex flex-column overflow-auto"
    style="height: 100vh"
  >
    <CountryTopHeader></CountryTopHeader>
    <div class="container py-3">
      <CountryListing></CountryListing>
    </div>
  </div>
</template>
