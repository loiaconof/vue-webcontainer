<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { FileSystemTree } from '@webcontainer/api'
import { Pane, Splitpanes } from 'splitpanes'
import Terminal from '@/components/Webcontainer/children/Terminal.vue'
import PanelEditor from '@/components/Webcontainer/children/PanelEditor.vue'
import useWebContainer from '@/composables/webcontainer.ts'
import 'splitpanes/dist/splitpanes.css'
import PanelFiles from './children/PanelFiles.vue'
import type { EditorFile } from '@/types/webcontainer'
import PanelLoading from '@/components/Webcontainer/children/PanelLoading.vue'
import { getFirstFileInDirectory } from '@/utils/files'

const props = defineProps<{ directory: FileSystemTree }>()

const iframe = ref<HTMLIFrameElement>()
const activeFile = ref<EditorFile>()

const { startDevServer, stream, updateFile, status } = useWebContainer()

watch(() => props.directory, () => { activeFile.value = getFirstFileInDirectory(props.directory) }, { immediate: true })

onMounted(() => startDevServer(iframe.value, props.directory))
</script>

<template>
  <div class="vue-webcontainer">
    <Splitpanes class="default-theme">
      <Pane size="10">
        <PanelFiles :directory @active-file="(_activeFile: EditorFile) => activeFile = _activeFile" />
      </Pane>
      <Pane size="45">
        <PanelEditor :active-file @update-file="updateFile">
          <template #terminal>
            <Terminal v-if="stream" :stream />
          </template>
        </PanelEditor>
      </Pane>
      <Pane size="45">
        <iframe v-show="status === 'ready'" ref="iframe" />
        <PanelLoading v-if="status !== 'ready'" />
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
