<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import type { EditorFile } from '@/types/webcontainer'

const props = defineProps<{ activeFile?: EditorFile }>()

const emit = defineEmits<{ (e: 'updateFile', name: string, content: string): void }>()

const code = ref('')
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

watch(code, (code) => {
  if (!props.activeFile)
    return

  emit('update-file', props.activeFile.name, code)
})

watch(() => props.activeFile?.name, () => {
  if (props.activeFile && typeof props.activeFile.node.file.contents === 'string')
    code.value = props.activeFile.node.file.contents
})
</script>

<template>
  <div class="panel-editor">
    <div class="editor">
      <VueMonacoEditor
        v-model:value="code"
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
