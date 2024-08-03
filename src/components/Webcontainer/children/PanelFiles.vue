<script setup lang="ts">
import type { FileNode, FileSystemTree } from '@webcontainer/api'
import { ref, watchEffect } from 'vue'
import FileSystemTreeComponent from './FileSystemTree.vue'

const props = defineProps<{
  directory: FileSystemTree
}>()

const emit = defineEmits<{ (e: 'activeFile', fileName: string, fileNode: FileNode): void }>()

const directory = ref<FileSystemTree>({})

watchEffect(() => { directory.value = props.directory })
</script>

<template>
  <div class="panel-files">
    <FileSystemTreeComponent :directory path="" @active-file="(fileName: string, fileNode: FileNode) => emit('activeFile', fileName, fileNode)" />
  </div>
</template>
