<template>
  <div>
    <search-input class="pb-4" v-model="studentSearchInput" placeholder="Taysom Ling" />
    <search-input class="pb-4" v-model="courseSearchInput" placeholder="Intro to programming" />
    <enrolled-courses-table :modelValue="enrolledCourses" />
    <!-- TODO #rm final -->
    <pre class="prose">
      {{ enrolledCourses }}
    </pre>
  </div>
</template>
<script lang="ts">
import { computed, onMounted, defineComponent, ref, watch, nextTick } from 'vue'
import EnrolledCoursesTable from '../components/enrolled-courses/EnrolledCoursesTable.vue'
import SearchInput from '../components/SearchInput.vue'
import { useRouter, useRoute } from 'vue-router'
import { axios } from '../plugins/request'
import { iCourse } from '../interfaces/interfaces'

interface iRouteQuery {
  student?: string
}

export default defineComponent({
  components: {
    EnrolledCoursesTable,
    SearchInput,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const enrolledCourses = ref(Array<iCourse>())

    const studentSearchInput = ref('')
    const courseSearchInput = ref('')

    const fetchEnrolledCourses = async (routeQuery: iRouteQuery) => {
      const response = await axios.post('enrolled-courses', JSON.stringify({ ...routeQuery }), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      enrolledCourses.value = response.data as Array<iCourse>
    }

    onMounted(async () => {
      await fetchEnrolledCourses(route.query)
    })

    /** STUDENT */
    const studentParam = computed(() => route.query?.student ?? '')

    /** STUDENT */
    watch(
      () => studentSearchInput.value,
      async (newStudentSearchInput) => {
        router.push({
          path: '/enrolled-courses',
          query: {
            ...route.query,
            student: newStudentSearchInput,
          },
        })
      },
      {
        immediate: true,
      }
    )

    /** STUDENT */
    watch(
      () => studentParam.value,
      async (newStudentRouterValue) => {
        if (studentSearchInput.value !== newStudentRouterValue) {
          studentSearchInput.value = newStudentRouterValue as string
        }
        await nextTick()
        await fetchEnrolledCourses(route.query)
      },
      {
        immediate: true,
      }
    )

    /** COURSE */
    const courseParam = computed(() => route.query?.course ?? '')

    /** COURSE */
    watch(
      () => courseSearchInput.value,
      async (newCourseSearchInput) => {
        router.push({
          path: '/enrolled-courses',
          query: {
            ...route.query,
            course: newCourseSearchInput,
          },
        })
      },
      {
        immediate: true,
      }
    )

    /** COURSE */
    watch(
      () => courseParam.value,
      async (newCourseRouterValue) => {
        if (courseSearchInput.value !== newCourseRouterValue) {
          studentSearchInput.value = newCourseRouterValue as string
        }
        await nextTick()
        await fetchEnrolledCourses(route.query)
      }
    )

    return {
      studentSearchInput,
      enrolledCourses,
      courseSearchInput,
      fetchEnrolledCourses,
      studentParam,
    }
  },
})
</script>
