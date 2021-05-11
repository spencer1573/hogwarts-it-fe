<template>
  <div class="justify-center w-full">
    <main-layout />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainLayout from './layouts/main.vue'

export default defineComponent({
  components: {
    MainLayout,
  },
})
</script>
