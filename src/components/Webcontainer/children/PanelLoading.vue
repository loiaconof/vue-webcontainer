<script setup lang="ts">
import type { WebcontainerSatus } from '@/types/webcontainer'

defineProps<{ status: WebcontainerSatus }>()
</script>

<template>
  <div class="panel-loading">
    <div class="loading-items-wrapper">
      <div class="loading-item">
        <img src="@/assets/check.svg" width="20" height="20">
        <p>Initializing</p>
      </div>
      <div class="loading-item">
        <img v-if="['init', 'mount', 'install', 'start', 'ready'].includes(status)" src="@/assets/check.svg" width="20" height="20">
        <p>Mounting file system</p>
      </div>
      <div class="loading-item">
        <img v-if="['init', 'mount', 'install'].includes(status)" src="@/assets/loading.svg" width="20" height="20">
        <img v-if="['start', 'ready'].includes(status)" src="@/assets/check.svg" width="20" height="20">
        <p>Installing dependencies</p>
      </div>
      <div class="loading-item">
        <img v-if="['init', 'mount', 'install', 'start'].includes(status)" src="@/assets/loading.svg" width="20" height="20">
        <img v-if="['ready'].includes(status)" src="@/assets/check.svg" width="20" height="20">
        <p>Running dev server</p>
      </div>
      <div class="loading-item">
        <img v-if="['init', 'mount', 'install', 'start'].includes(status)" src="@/assets/loading.svg" width="20" height="20">
        <img v-if="['ready'].includes(status)" src="@/assets/check.svg" width="20" height="20">
        <p>Application ready</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.loading-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
}

.loading-item p {
    margin: 5px 0;
}
</style>
