<template>
  <div>
    <students-table />
  </div>
</template>

<script lang="ts">
import { computed, onMounted, defineComponent } from 'vue'
import { useStore, Action } from '@/store/index'
import StudentsTable from '../components/students/StudentsTable.vue'

export default defineComponent({
  components: {
    StudentsTable,
  },
  setup() {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch(Action.fetchStudents)
    })

    const students = computed(() => store.state.students)

    return {
      students,
    }
  },
})
</script>
