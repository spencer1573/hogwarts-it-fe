<template>
  <div>
    <search-input
      class="pb-4"
      v-model="combinedSearchInput"
      placeholder="Course plus student search"
    />
    <enrolled-courses-table :modelValue="enrolledCourses" />
  </div>
</template>
<script lang="ts">
import { computed, onMounted, defineComponent, ref, watch, nextTick } from 'vue'
import EnrolledCoursesTable from '../components/enrolled-courses/EnrolledCoursesTable.vue'
import SearchInput from '../components/SearchInput.vue'
import { useRouter, useRoute } from 'vue-router'
import { axios } from '../plugins/request'
import { iEnrolledCourse } from '../interfaces/interfaces'

interface iRouteQuery {
  combinedQuery?: string
}

export default defineComponent({
  components: {
    EnrolledCoursesTable,
    SearchInput,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const enrolledCourses = ref(Array<iEnrolledCourse>())

    const combinedSearchInput = ref('')

    const fetchEnrolledCourses = async (routeQuery: iRouteQuery) => {
      const response = await axios.post('enrolled-courses', JSON.stringify({ ...routeQuery }), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      enrolledCourses.value = response.data as Array<iEnrolledCourse>
    }

    onMounted(async () => {
      await fetchEnrolledCourses(route.query)
    })

    /** COMBINED */
    const combinedQueryParam = computed(() => route.query?.combinedQuery ?? '')

    /** COMBINED */
    watch(
      () => combinedSearchInput.value,
      async (newCombinedSearchInput) => {
        router.push({
          path: '/enrolled-courses',
          query: {
            combinedQuery: newCombinedSearchInput,
          },
        })
      },
      {
        immediate: true,
      }
    )

    /** STUDENT */
    watch(
      () => combinedQueryParam.value,
      async (newCombinedQueryRouterValue) => {
        if (combinedSearchInput.value !== newCombinedQueryRouterValue) {
          combinedSearchInput.value = newCombinedQueryRouterValue as string
        }
        await nextTick()
        await fetchEnrolledCourses(route.query)
      },
      {
        immediate: true,
      }
    )

    return {
      combinedSearchInput,
      enrolledCourses,
      fetchEnrolledCourses,
      combinedQueryParam,
    }
  },
})
</script>
