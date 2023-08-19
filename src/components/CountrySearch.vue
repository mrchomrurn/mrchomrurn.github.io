<template>
  <div class="position-sticky top-0 start-0 bg-white border-bottom-lg">
    <div class="container">
      <div class="d-flex align-items-center w-100 py-2 gap-2">
        <input
          v-model="textSearch"
          class="form-control form-control-lg rounded-3"
          placeholder="Search here..."
          @input="countrySearch"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryStore } from '../stores/country'

const countryStore = useCountryStore()

const { countrySearch } = countryStore

const { textSearch } = storeToRefs(countryStore)
</script>
