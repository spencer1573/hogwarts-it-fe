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
                    Name
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr :key="student.id" v-for="student in students">
                  <td
                    @click="emitSelected(student)"
                    :class="{ 'bg-green-50': student.id === selectedStudentId }"
                    class="px-6 py-4 whitespace-nowrap"
                  >
                    <div class="flex items-center">
                      <div class="">
                        <div class="text-sm font-medium text-gray-900">
                          {{ student.firstName
                          }}<span v-if="student.middleName">&nbsp;{{ student.middleName }}</span
                          >&nbsp;{{ student.lastName }}
                        </div>
                        <div class="text-sm text-gray-500">{{ student.email }}</div>
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
import { computed, defineComponent } from 'vue'
import { iStudent } from '../../interfaces/interfaces'

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
    selectedStudentId: {
      type: Number,
      default: -1,
    },
  },
  emits: ['selectedStudent'],
  setup(props, { emit }) {
    const students = computed(() => props.modelValue)
    const selectedStudentId = computed(() => props.selectedStudentId)

    const emitSelected = (student: iStudent) => {
      emit('selectedStudent', student)
    }

    return {
      students,
      selectedStudentId,
      emitSelected,
    }
  },
})
</script>
