import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ICountry, IPagination } from '../types'
import { useAxios } from '../composables/use-axios'
import { Status } from '../enums/status'
import { useDebounce } from '../composables/use-debounce'
import { useSortBy } from '../composables/use-sort'

export const useCountryStore = defineStore('country', () => {
  const TOTAL_PER_PAGE = 25

  const axios = useAxios()

  const textSearch = ref<string>('')
  const isNamedSortAsc = ref<boolean>(true)

  const status = ref<Status>(Status.Initial)
  const detailStatus = ref<Status>(Status.Initial)
  const detailDailog = ref<boolean>(false)

  const countryDetail = ref<ICountry>()
  const countries = ref<ICountry[]>([])
  const pagination = ref<IPagination>({
    page: 1,
    totalPage: 1,
  })

  const getCountries = computed<ICountry[]>(() => {
    const { page } = pagination.value
    const fromIndex = (page - 1) * TOTAL_PER_PAGE
    const toIndex = fromIndex + TOTAL_PER_PAGE

    return useSortBy(
      countries.value,
      (v: ICountry) => v.name.official,
      isNamedSortAsc.value
    ).slice(fromIndex, toIndex) as ICountry[]
  })

  const namedSort = () => {
    isNamedSortAsc.value = !isNamedSortAsc.value
  }

  const fetchCountries = async () => {
    try {
      status.value = Status.Fetching
      const { data } = await axios.get(
        textSearch.value ? `/name/${textSearch.value}` : '/all',
        {
          fields: ['name', 'flags', 'cca2', 'cca3', 'altSpellings', 'idd'].join(
            ','
          ),
        }
      )
      countries.value = data
      pagination.value = {
        page: 1,
        totalPage: Math.ceil(countries.value.length / TOTAL_PER_PAGE),
      }
      status.value = Status.Success
    } catch (e) {
      // TODO: Error handling implementation
      console.log(e)
      status.value = Status.Error
    }
  }

  const countrySearch = useDebounce(fetchCountries)

  const countryClick = async (country: ICountry) => {
    detailDailog.value = true
    try {
      detailStatus.value = Status.Fetching
      const { data } = await axios.get('/alpha', {
        codes: country.cca3,
      })

      countryDetail.value = data[0]

      detailStatus.value = Status.Success
    } catch (e) {
      // TODO: Error handling implementation
      console.log(e)
      detailStatus.value = Status.Error
    }
  }

  return {
    isNamedSortAsc,
    textSearch,

    status,
    detailStatus,
    detailDailog,

    countries,
    countryDetail,
    pagination,

    getCountries,

    fetchCountries,
    countrySearch,
    namedSort,
    countryClick,
  }
})
