<script setup lang="ts">
import { ref, watch } from 'vue'
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'

const props = defineProps<{ code: string }>()

const activeCode = ref(props.code)
const showTerminal = ref(true)
const editorOptions = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}

watch(() => props.code, (code: string) => activeCode.value = code)
</script>

<template>
  <div class="panel-editor">
    <div class="editor">
      <VueMonacoEditor
        v-model:value="activeCode"
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
