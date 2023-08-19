<template>
  <div
    class="position-relative d-flex flex-column overflow-auto"
    style="height: 100vh"
  >
    <CountryTopHeader></CountryTopHeader>
    <div class="container py-3">
      <CountryListing></CountryListing>
    </div>
    <div class="position-sticky bottom-0 start-0 bg-white border-top-lg">
      <div class="container py-3">
        <Pagination v-model="pagination"></Pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountryStore } from './stores/country'
import CountryListing from './components/CountryListing.vue'
import CountryTopHeader from './components/CountryTopHeader.vue'
import Pagination from './components/core/Pagination.vue'
import { storeToRefs } from 'pinia'

const countryStore = useCountryStore()

const { fetchCountries } = countryStore
const { pagination } = storeToRefs(countryStore)

onMounted(() => {
  fetchCountries()
})
</script>
