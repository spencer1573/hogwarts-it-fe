<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="mt-1">
      <input
        v-model="valueInput"
        type="text"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, watch, ref } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  // TODO fix this emit warning
  emits: { 'update:modelValue': (arg: string) => {} },
  setup(props, { emit }) {
    const { label, modelValue } = toRefs(props)
    const valueInput = ref('')

    watch(
      () => modelValue.value,
      (newModelValue) => {
        valueInput.value = newModelValue
      }
    )

    watch(
      () => valueInput.value,
      (newValueInput) => {
        emit('update:modelValue', newValueInput)
      }
    )

    return {
      label,
      valueInput,
    }
  },
})
</script>
