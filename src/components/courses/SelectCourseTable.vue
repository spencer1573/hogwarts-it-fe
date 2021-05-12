<template>
  <div class="">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Course Name
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr :key="course.id" v-for="course in courses">
                  <td
                    @click="emitSelected(course)"
                    :class="{ 'bg-green-50': course.id === selectedCourseId }"
                    class="px-6 py-4 whitespace-nowrap"
                  >
                    <div class="flex items-center">
                      <div class="text-sm font-medium text-gray-900">
                        {{ course.name }}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { iCourse } from '../../interfaces/interfaces'

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
    selectedCourse: {
      type: Object,
      default: {},
    },
  },
  emits: ['update:selectedCourse'],
  setup(props, { emit }) {
    const courses = computed(() => props.modelValue)
    const selectedCourseId = computed(() => props.selectedCourse.id)

    const emitSelected = (course: iCourse) => {
      emit('update:selectedCourse', course)
    }

    return {
      courses,
      selectedCourseId,
      emitSelected,
    }
  },
})
</script>
