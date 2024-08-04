<script setup lang="ts">
import type { FileSystemTree } from '@webcontainer/api'
import { ref, watchEffect } from 'vue'
import FileSystemTreeComponent from './FileSystemTree.vue'
import type { EditorFile } from '@/types/webcontainer';

const props = defineProps<{
  directory: FileSystemTree
}>()

const emit = defineEmits<{ (e: 'activeFile', activeFile: EditorFile): void }>()

const directory = ref<FileSystemTree>({})

watchEffect(() => { directory.value = props.directory })
</script>

<template>
  <div class="panel-files">
    <FileSystemTreeComponent :directory path="" @active-file="(activeFile: EditorFile) => emit('activeFile', activeFile)" />
  </div>
</template>
