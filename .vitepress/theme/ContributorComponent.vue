<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()
const contributors = computed(() => page.value.contributors)
console.log(page.value.contributors)
</script>

<template>
  wow
</template>