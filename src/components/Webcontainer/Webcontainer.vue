<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FileNode, FileSystemTree } from '@webcontainer/api'
import { Pane, Splitpanes } from 'splitpanes'
import Terminal from '@/components/Webcontainer/children/Terminal.vue'
import PanelEditor from '@/components/Webcontainer/children/PanelEditor.vue'
import useWebContainer from '@/composables/webcontainer.ts'
import 'splitpanes/dist/splitpanes.css'
import PanelFiles from './children/PanelFiles.vue'

const props = defineProps<{ directory: FileSystemTree }>()

const editorCode = ref('')
const iframe = ref<HTMLIFrameElement>()
const activeFile = reactive<{ name?: string, node?: FileNode }>({ name: undefined, node: undefined })

const { startDevServer, stream } = useWebContainer()

function updateActiveFile(fileName: string, fileNode: FileNode) {
  activeFile.name = fileName
  activeFile.node = fileNode
}

onMounted(() => startDevServer(iframe.value, props.directory))
</script>

<template>
  <div class="vue-webcontainer">
    <Splitpanes class="default-theme">
      <Pane size="10">
        <PanelFiles :directory @active-file="updateActiveFile" />
      </Pane>
      <Pane size="45">
        <PanelEditor :code="editorCode">
          <template #terminal>
            <Terminal v-if="stream" :stream />
          </template>
        </PanelEditor>
      </Pane>
      <Pane size="45">
        <iframe ref="iframe" />
      </Pane>
    </Splitpanes>
  </div>
</template>

<style scoped>
.vue-webcontainer {
  height: 100%;
  width: 100%;
}

.default-theme {
  height: 900px;
}

iframe {
  height: 100%;
  width: 100%;
}
</style>
