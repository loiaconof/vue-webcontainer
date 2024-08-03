<script setup lang="ts">
import { ref, watch } from 'vue'
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import type { FileNode } from '@webcontainer/api'

defineProps<{ activeFile: { name?: string, node?: FileNode } }>()

const showTerminal = ref(true)
const editorOptions = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}
</script>

<template>
  <div class="panel-editor">
    <div class="editor">
      <VueMonacoEditor
        v-if="activeFile.node && typeof activeFile.node.file.contents === 'string'"
        v-model:value="activeFile.node.file.contents"
        theme="vs-dark"
        :options="editorOptions"
        class="monaco-editor"
      />
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

.editor {
  height: 100%;
  width: 100%;
}
.monaco-editor {
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
