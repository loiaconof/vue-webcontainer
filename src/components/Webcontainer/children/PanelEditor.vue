<script setup lang="ts">
import { ref } from 'vue'

const showTerminal = ref(true)
</script>

<template>
  <div class="panel-editor">
    <div class="editor">
      editor here {{ showTerminal }}
    </div>
    <div class="terminal-wrapper">
      <div class="terminal-header" @click="showTerminal = !showTerminal">
        Terminal
      </div>
      <Transition>
        <div v-show="showTerminal">
          <slot name="terminal" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.panel-editor{
    position:relative;
    height: 100%;
    width: 100%;
}

.terminal-header {

}

.terminal-wrapper{
    position:absolute;
    bottom:0;
    width: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
