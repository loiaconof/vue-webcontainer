<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Terminal from '@/components/Terminal.vue'
import useWebContainer from '@/composables/webcontainer.ts'
import pjs from '@/../package.json?raw'

const stream = ref<ReadableStream>()
const iframe = ref<HTMLIFrameElement>()

async function startDevServer() {
  const wc = await useWebContainer()

  wc.on('server-ready', (port, url) => (iframe.value!.src = url))

  await wc.mount({
    'package.json': {
      file: {
        contents: pjs,
      },
    },
  })

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
  <div>
    <iframe ref="iframe" />
    <Terminal :stream />
  </div>
</template>
