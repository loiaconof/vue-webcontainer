<script setup lang="ts">
import type { FileSystemTree } from '@webcontainer/api'
import { ref } from 'vue'
import FileSystemTreeComponent from './FileSystemTree.vue'

defineProps<{
  directory: FileSystemTree
  path: string
}>()

const openDirectory = ref<string[]>([])

function handleOpenDirectories(directoryName: string) {
  if (!openDirectory.value.includes(directoryName)) {
    openDirectory.value.push(directoryName)
    return
  }
  openDirectory.value = openDirectory.value.filter(dirName => dirName !== directoryName)
}
</script>

<template>
  <div class="panel-files">
    <div v-for="(data, name) in directory" :key="name">
      <div v-if="data.directory">
        <div @click.stop="handleOpenDirectories(name)">
          {{ path }}/{{ name }}
        </div>
        <FileSystemTreeComponent v-show="openDirectory.includes(name)" :directory="data.directory" :path="`${path}/${name}`" />
      </div>
      <span v-else @click="console.log('')">{{ path }}/{{ name }}</span>
    </div>
  </div>
</template>
