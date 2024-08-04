<script setup lang="ts">
import { ref } from 'vue'
import type { FileNode, FileSystemTree } from '@webcontainer/api'
import FileSystemTreeComponent from './FileSystemTree.vue'
import type { EditorFile } from '@/types/webcontainer'

defineProps<{
  directory: FileSystemTree
  path: string
}>()

const emit = defineEmits<{ (e: 'activeFile', activeFile: EditorFile): void }>()

const openDirectory = ref<(string | number)[]>([])

function handleOpenDirectories(directoryName: string | number) {
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
        <div class="directory-wrapper" @click.stop="handleOpenDirectories(name)">
          <svg v-if="openDirectory.includes(name)" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 9l6 6l6-6" /></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9 6l6 6l-6 6" /></svg>
          <div>
            {{ name }}
          </div>
        </div>
        <div v-show="openDirectory.includes(name)" class="directory-files-wrapper">
          <FileSystemTreeComponent :directory="data.directory" :path="`${path}/${name}`" @active-file="(activeFile: EditorFile) => emit('activeFile', activeFile)" />
        </div>
      </div>
      <span v-else-if="data.file" @click.stop.prevent="emit('activeFile', { name: `${path}/${name}`, node: data as FileNode })">{{ name }}</span>
    </div>
  </div>
</template>

<style scoped>
.directory-wrapper {
  display: flex;
  align-items: center;
}

.directory-files-wrapper {
  padding: 0 0 0 10px;
  border-left: 1px solid black;
}
</style>
