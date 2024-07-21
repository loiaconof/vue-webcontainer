<script setup lang="ts">
import type { FileSystemTree } from '@webcontainer/api'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  directory: FileSystemTree
}>()

const directory = ref<FileSystemTree>({})

watchEffect(() => { directory.value = props.directory })
</script>

<template>
  <div class="panel-files">
    <div v-for="(data, name) in directory" :key="name">
      <div v-if="data.directory" />
      <span v-else @click="console.log('')">{{ name }}</span>
    </div>
  </div>
</template>
