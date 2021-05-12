<template>
  <div class="">
    <div class="">
      <div class="">
        <span v-if="showWasAlreadyEnrolledError" class="text-red-600"
          >Course has already been enrolled in this semester. Nothing changed.</span
        ><span v-if="showSuccessEnrollMessage" class="text-green-700">Course enrolled</span>&nbsp;
        <div class="max-w-3xl mx-auto space-x-4 lg:max-w-7xl lg:grid grid-cols-12 pb-4">
          <!-- <div class="hidden lg:block lg:col-span-3 xl:col-span-2 bg-yellow-200"></div> -->
          <div class="col-span-6">
            <h2 class="text-lg font-medium text-gray-900">Student Directory</h2>
            <div class="text-sm text-gray-500">
              Selected Student:
              <div class="text-sm font-medium text-green-700">
                <span class="text-red-600" v-if="showSelectedStudentError">
                  Must select a course.</span
                >
                <span v-if="selectedStudent">
                  {{ selectedStudent.firstName
                  }}<span v-if="selectedStudent.middleName"
                    >&nbsp;{{ selectedStudent.middleName }}</span
                  >&nbsp;{{ selectedStudent.lastName }}</span
                >&nbsp;
              </div>
            </div>
          </div>
          <div class="col-span-6">
            <div class="flex justify-between">
              <div>
                <h2 class="text-lg font-medium text-gray-900">Available Courses</h2>
                <div class="text-sm text-gray-500">
                  Course Student:
                  <div class="text-sm font-medium text-green-700">
                    <span v-if="showSelectedCourseError" class="text-red-600"
                      >Must select a course.</span
                    >
                    <span v-if="selectedStudent">{{ selectedCourse.name }}</span
                    >&nbsp;
                  </div>
                </div>
              </div>
              <div class="w-48 flex justify-end">
                <div>
                  <button
                    @click="goBack()"
                    type="button"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    @click="submitEnroll()"
                    type="button"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO #rm -->
      <!-- <div class="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8        showWasAlreadyEnrolledError.value = false lg:grid lg:grid-cols-12 lg:gap-8"> -->
      <div class="max-w-3xl mx-auto space-x-4 lg:max-w-7xl lg:grid grid-cols-12">
        <!-- <div class="hidden lg:block lg:col-span-3 xl:col-span-2 bg-yellow-200"></div> -->
        <div class="col-span-6">
          <!-- <h2 class="text-lg font-medium text-gray-900">Directory</h2>
          <p class="mt-1 text-sm text-gray-600 pb-4">Search directory of students</p> -->
          <div class="space-y-4">
            <search-input v-model="studentSearchInput" />
            <student-select-table
              :selectedStudentId="selectedStudent.id"
              @selectedStudent="setSelectedStudent"
              :modelValue="studentsToSelectFrom"
            />
          </div>
        </div>
        <div class="col-span-6">
          <!-- <h2 class="text-lg font-medium text-gray-900">Available Courses</h2>
          <p class="mt-1 text-sm text-gray-600 pb-4">Search directory of Courses</p> -->
          <div class="space-y-4">
            <search-input v-model="courseSearchInput" />
            <select-course-table
              v-model:selectedCourse="selectedCourse"
              :modelValue="coursesToSelectFrom"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, nextTick, computed } from 'vue'
import { axios } from '../plugins/request'
import SearchInput from '../components/SearchInput.vue'
import StudentSelectTable from '../components/students/StudentSelectTable.vue'
import SelectCourseTable from '../components/courses/SelectCourseTable.vue'
import { iStudent, iCourse, iRawEnrolledCourse } from '../interfaces/interfaces'
import { useRouter } from 'vue-router'

interface iEnrollSubmit {
  selectedCourseId: string
  selectedStudentId: string
}

interface iEnrollSubmitResponse {
  wasAlreadyEnrolled: boolean
  data: Array<iRawEnrolledCourse>
}

export default defineComponent({
  components: {
    StudentSelectTable,
    SearchInput,
    SelectCourseTable,
  },
  setup() {
    const router = useRouter()

    /** STUDENT */
    const studentSearchInput = ref('')
    const studentsToSelectFrom = ref([])
    const selectedStudent = ref(<iStudent>{})
    const showSelectedStudentError = ref(false)

    /** COURSE */
    const courseSearchInput = ref('')
    const coursesToSelectFrom = ref(<iCourse>{})
    const selectedCourse = ref(<iCourse>{})
    const showSelectedCourseError = ref(false)

    const selectedStudentId = computed(() => selectedStudent.value?.id ?? null)
    const selectedCourseId = computed(() => selectedCourse.value?.id ?? null)

    const showWasAlreadyEnrolledError = ref(false)
    const showSuccessEnrollMessage = ref(false)

    /** STUDENT */
    const fetchStudents = async (studentQuery: string) => {
      const response = await axios.post('search-students', JSON.stringify({ studentQuery }), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      studentsToSelectFrom.value = response.data
    }

    /** COURSE */
    const fetchCourses = async (courseQuery: string) => {
      const response = await axios.post('search-courses', JSON.stringify({ courseQuery }), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      coursesToSelectFrom.value = response.data
    }

    /** STUDENT */
    const setSelectedStudent = (student: iStudent) => {
      selectedStudent.value = student
    }

    /** STUDENT */
    watch(
      () => studentSearchInput.value,
      async (newStudentSearchInput) => {
        await nextTick()
        await fetchStudents(newStudentSearchInput)
      },
      {
        immediate: true,
      }
    )

    /** COURSE */
    watch(
      () => courseSearchInput.value,
      async (newCourseSearchInput) => {
        await nextTick()
        await fetchCourses(newCourseSearchInput)
      },
      {
        immediate: true,
      }
    )

    const goBack = () => {
      router.go(-1)
    }

    const selectedStudentIsValid = computed((): boolean => {
      return !!selectedStudentId.value
    })

    const selectedCourseIsValid = computed((): boolean => {
      return !!selectedCourseId.value
    })

    const enrollIsValid = computed((): boolean => {
      return selectedStudentIsValid.value && selectedCourseIsValid.value
    })

    /** STUDENT */
    watch(
      () => selectedStudent.value.id,
      () => {
        resetAllErrorsAndMessages()
      }
    )

    /** COURSE */
    watch(
      () => selectedCourse.value.id,
      () => {
        resetAllErrorsAndMessages()
      }
    )

    const resetAllErrorsAndMessages = () => {
      showSelectedStudentError.value = false
      showSelectedCourseError.value = false
      showWasAlreadyEnrolledError.value = false
      showSuccessEnrollMessage.value = false
    }

    const enrollStudentInCourse = async () => {
      const payload: iEnrollSubmit = {
        selectedCourseId: selectedCourseId.value as string,
        selectedStudentId: selectedStudentId.value as string,
      }
      try {
        const response = await axios.post('/enroll-in-course', JSON.stringify(payload), {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const newEnroll: iEnrollSubmitResponse = response.data
        if (newEnroll.wasAlreadyEnrolled) {
          showWasAlreadyEnrolledError.value = true
        } else {
          if (newEnroll.data.length > 0) {
            showSuccessEnrollMessage.value = true
          }
        }
        console.log('new enroll sucess ', newEnroll)
      } catch (err) {
        console.log('some err setting enroll ', err)
      }
    }

    const submitEnroll = async () => {
      if (!selectedStudentIsValid.value) {
        showSelectedStudentError.value = true
      }
      if (!selectedCourseIsValid.value) {
        showSelectedCourseError.value = true
      }
      if (enrollIsValid.value) {
        await enrollStudentInCourse()
      }
    }

    return {
      /** STUDENT */
      fetchStudents,
      setSelectedStudent,
      studentSearchInput,
      studentsToSelectFrom,
      selectedStudent,

      /** COURSE */
      fetchCourses,
      courseSearchInput,
      coursesToSelectFrom,
      selectedCourse,

      /** SUBMIT */
      selectedStudentIsValid,
      showSelectedStudentError,
      selectedCourseIsValid,
      showSelectedCourseError,
      goBack,
      enrollIsValid,
      submitEnroll,
      showWasAlreadyEnrolledError,
      showSuccessEnrollMessage,
    }
  },
})
</script>
