<script setup lang="ts">
import type { FileSystemTree } from '@webcontainer/api'
import { onBeforeMount, ref } from 'vue'
import Playground from '@/components/Playground.vue'

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
