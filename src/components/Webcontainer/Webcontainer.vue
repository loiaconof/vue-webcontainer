<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { FileSystemTree } from '@webcontainer/api'
import Terminal from '@/components/Webcontainer/children/Terminal.vue'
import SplitPane from '@/components/Webcontainer/children/SplitPane.vue'
import useWebContainer from '@/composables/webcontainer.ts'

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
    <SplitPane>
      <template #up>
        <iframe ref="iframe" />
      </template>
      <template #down>
        <Terminal v-if="stream" :stream />
      </template>
    </SplitPane>
  </div>
</template>

<style scoped>
.vue-webcontainer {
    height: 100%;
    width: 100%;
}

iframe {
    height: 100%;
    width: 100%;
}
</style>
