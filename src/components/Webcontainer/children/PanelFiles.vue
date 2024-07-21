<script setup lang="ts">
import type { FileSystemTree } from '@webcontainer/api'
import { ref, watchEffect } from 'vue'
import FileSystemTreeComponent from './FileSystemTree.vue'

const props = defineProps<{
  directory: FileSystemTree
}>()

const directory = ref<FileSystemTree>({})

watchEffect(() => { directory.value = props.directory })
</script>

<template>
  <div class="panel-files">
    <FileSystemTreeComponent :directory path="" />
  </div>
</template>
