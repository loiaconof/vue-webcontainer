<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { FileSystemTree } from '@webcontainer/api'
import { Pane, Splitpanes } from 'splitpanes'
import Terminal from '@/components/Webcontainer/children/Terminal.vue'
import PanelEditor from '@/components/Webcontainer/children/PanelEditor.vue'
import useWebContainer from '@/composables/webcontainer.ts'
import 'splitpanes/dist/splitpanes.css'

const props = defineProps<{ directory: FileSystemTree }>()

const stream = ref<ReadableStream>()
const iframe = ref<HTMLIFrameElement>()

async function startDevServer() {
  const wc = await useWebContainer()

  wc.on('server-ready', (port, url) => (iframe.value!.src = url))

  await wc.mount(props.directory)

  const installProcess = await wc.spawn('pnpm', ['install'])
  stream.value = installProcess.output
  const installExitCode = await installProcess.exit

  if (installExitCode !== 0) {
    throw new Error('Unable to run npm install')
  }

  const devProcess = await wc.spawn('pnpm', ['dev'])
  stream.value = devProcess.output
}

onMounted(startDevServer)
</script>

<template>
  <div class="vue-webcontainer">
    <Splitpanes class="default-theme">
      <Pane size="10">
        files
      </Pane>
      <Pane size="45">
        <PanelEditor>
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
