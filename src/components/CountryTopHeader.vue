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
        <button
          class="btn py-2 d-flex align-items-center rounded-3 h-100"
          @click="namedSort"
        >
          Name
          <InlineSvg
            v-if="isNamedSortAsc"
            class="svg-icon ms-2"
            src="/icons/sort-from-top-to-bottom.svg"
          ></InlineSvg>
          <InlineSvg
            v-else
            class="svg-icon ms-2"
            src="/icons/sort-from-bottom-to-top.svg"
          ></InlineSvg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryStore } from '../stores/country'
import InlineSvg from 'vue-inline-svg'

const countryStore = useCountryStore()

const { countrySearch, namedSort } = countryStore

const { textSearch, isNamedSortAsc } = storeToRefs(countryStore)
</script>
