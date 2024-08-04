<script setup lang="ts">
import useWebContainer from '@/composables/webcontainer'

const { status, errorMessage } = useWebContainer()
</script>

<template>
  <div class="panel-loading">
    <div class="loading-items-wrapper">
      <div class="loading-item">
        <img src="@/assets/check.svg" width="20" height="20">
        <p>Initializing</p>
      </div>
      <div class="loading-item">
        <img v-if="status === 'error'" src="@/assets/loading.svg" width="20" height="20">
        <img v-else-if="['init', 'mount', 'install', 'start', 'ready'].includes(status)" src="@/assets/check.svg" width="20" height="20">
        <p>Mounting file system</p>
      </div>
      <div class="loading-item">
        <img v-if="status === 'error'" src="@/assets/loading.svg" width="20" height="20">
        <img v-else-if="['init', 'mount', 'install'].includes(status)" src="@/assets/loading.svg" width="20" height="20">
        <img v-else-if="['start', 'ready'].includes(status)" src="@/assets/check.svg" width="20" height="20">
        <p>Installing dependencies</p>
      </div>
      <div class="loading-item">
        <img v-if="status === 'error'" src="@/assets/loading.svg" width="20" height="20">
        <img v-else-if="['init', 'mount', 'install', 'start'].includes(status)" src="@/assets/loading.svg" width="20" height="20">
        <img v-else-if="['ready'].includes(status)" src="@/assets/check.svg" width="20" height="20">
        <p>Running dev server</p>
      </div>
      <div class="loading-item">
        <img v-if="status === 'error'" src="@/assets/loading.svg" width="20" height="20">
        <img v-else-if="['init', 'mount', 'install', 'start'].includes(status)" src="@/assets/loading.svg" width="20" height="20">
        <img v-else-if="['ready'].includes(status)" src="@/assets/check.svg" width="20" height="20">
        <p>Application ready</p>
      </div>
      <div v-if="status === 'error'" class="loading-item">
        <img src="@/assets/loading.svg" width="20" height="20">
        <p>{{ errorMessage }}</p>
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
