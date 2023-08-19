<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center mb-0">
      <li class="page-item" :class="{ disabled: pagination.page == 1 }">
        <a class="page-link" @click.prevent="onNavigate('prev')">Previous</a>
      </li>
      <li v-for="page in getPagination" class="page-item">
        <a
          class="page-link"
          :class="{ active: page == pagination.page }"
          href="#"
          @click.prevent="pageChange(page)"
          >{{ page }}</a
        >
      </li>
      <li
        class="page-item"
        :class="{ disabled: pagination.page == pagination.totalPage }"
      >
        <a class="page-link" href="#" @click.prevent="onNavigate('next')"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { IPagination } from '../../types'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object as () => IPagination,
    required: true,
  },
})

const pagination = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const getPagination = computed(() => {
  const { totalPage } = pagination.value

  return [...new Array(totalPage)].map((_, i) => i + 1)
})

const onNavigate = (action: 'next' | 'prev') => {
  const { page, totalPage } = pagination.value

  if (action === 'next') {
    if (page === totalPage) return
    pageChange(page + 1)
    return
  }
  if (page === 1) return
  pageChange(page - 1)
}

const pageChange = (page: number) => {
  pagination.value.page = page
}
</script>
