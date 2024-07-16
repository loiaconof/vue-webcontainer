<script setup lang="ts">
</script>

<template>
  <div class="split-pane">
    <div class="up">
      <slot name="up" />
      <div class="dragger" />
    </div>
    <div class="down">
      <slot name="down" />
    </div>
  </div>
</template>

<style scoped>
.left {
  border-bottom: 1px solid var(--border);
}
</style>
