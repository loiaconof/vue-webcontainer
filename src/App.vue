<script setup lang="ts">
import type { FileSystemTree } from '@webcontainer/api'
import { onBeforeMount, ref } from 'vue'
import Playground from '@/components/Webcontainer/Webcontainer.vue'

const directory = ref()

async function getDirectoryStructure(): Promise<FileSystemTree> {
  let directory: FileSystemTree = {}
  await fetch('http://localhost:3000/webcontainer/files')
    .then(response => directory = response.json())

  return directory
}

onBeforeMount(async () => directory.value = await getDirectoryStructure())
</script>

<template>
  <main>
    <Playground :directory />
  </main>
</template>

<style scoped>
main {
  height: 100%;
  width: 100%;
}
</style>
