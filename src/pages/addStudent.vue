<template>
  <div>
    <form class="space-y-8">
      <div class="space-y-8">
        <div class="">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Add New Student</h3>
            <p class="mt-1 text-sm text-gray-500">
              Students already enrolled in hogwarts are not automatically enrolled here.
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <basic-field class="sm:col-span-2" label="First" v-model="firstName" />
            <basic-field class="sm:col-span-2" label="Middle" v-model="middleName" />
            <basic-field class="sm:col-span-2" label="Last" v-model="lastName" />
            <basic-field class="sm:col-span-3" label="Email" v-model="email" />
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <button
            @click="goBack()"
            type="button"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            @click="submitStudent()"
            type="button"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import { axios } from '../plugins/request'
import BasicField from '../components/field/BasicField.vue'
import { useRouter } from 'vue-router'
import { iStudent } from '../interfaces/interfaces'

export default defineComponent({
  components: {
    BasicField,
  },
  setup() {
    const router = useRouter()

    const firstName = ref('')
    const middleName = ref('')
    const lastName = ref('')
    const email = ref('')

    const newStudentResponse = ref(<iStudent>{})

    const goBack = () => {
      router.go(-1)
    }

    const submitStudent = async () => {
      const payload = {
        email: email.value,
        firstName: firstName.value,
        middleName: middleName.value,
        lastName: lastName.value,
      }
      const response = await axios.post('/create-student', JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const newStudent: iStudent = response.data
      console.log('students ', newStudent)
      newStudentResponse.value = newStudent
    }

    return {
      goBack,
      submitStudent,
      firstName,
      middleName,
      lastName,
      email,
    }
  },
})
</script>
