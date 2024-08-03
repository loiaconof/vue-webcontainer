<script setup lang="ts">
import type { FileNode, FileSystemTree } from '@webcontainer/api'
import { ref, watchEffect } from 'vue'
import FileSystemTreeComponent from './FileSystemTree.vue'
import type { ActiveFile } from '@/types/webcontainer';

const props = defineProps<{
  directory: FileSystemTree
}>()

const emit = defineEmits<{ (e: 'activeFile', activeFile: ActiveFile): void }>()

const directory = ref<FileSystemTree>({})

watchEffect(() => { directory.value = props.directory })
</script>

<template>
  <div class="panel-files">
    <FileSystemTreeComponent :directory path="" @active-file="(activeFile: ActiveFile) => emit('activeFile', activeFile)" />
  </div>
</template>
