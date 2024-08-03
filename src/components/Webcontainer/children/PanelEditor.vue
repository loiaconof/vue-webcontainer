<script setup lang="ts">
import { computed, ref } from 'vue'
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import type { ActiveFile } from '@/types/webcontainer'

const props = defineProps<{ activeFile?: ActiveFile }>()

const showTerminal = ref(true)
const editorOptions = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}
const language = computed(() => {
  if (!props.activeFile)
    return 'plaintext'

  const ext = props.activeFile.name.split('.').pop()
  switch (ext) {
    case 'js': return 'javascript'
    case 'ts': return 'typescript'
    case 'css': return 'css'
    case 'json': return 'json'
    case 'vue': return 'vue'
    case 'html': return 'html'
    default: return 'plaintext'
  }
})
</script>

<template>
  <div class="panel-editor">
    <div class="editor">
      <VueMonacoEditor
        v-if="activeFile && typeof activeFile.node.file.contents === 'string'"
        v-model:value="activeFile.node.file.contents"
        theme="vs-dark"
        :options="editorOptions"
        class="monaco-editor"
        :language
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
