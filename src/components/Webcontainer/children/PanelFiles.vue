<script setup lang="ts">
import type { FileSystemTree } from '@webcontainer/api'
import { ref, watchEffect } from 'vue'
import FileSystemTreeComponent from './FileSystemTree.vue'

const props = defineProps<{
  directory: FileSystemTree
}>()

const emit = defineEmits<{ (e: 'activeFile', code: string): void }>()

const directory = ref<FileSystemTree>({})

watchEffect(() => { directory.value = props.directory })
</script>

<template>
  <div class="panel-files">
    <FileSystemTreeComponent :directory path="" @active-file="(content: string) => emit('activeFile', content)" />
  </div>
</template>
