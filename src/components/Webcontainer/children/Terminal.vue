<script setup lang="ts">
import 'xterm/css/xterm.css'
import { onMounted, ref, watch } from 'vue'
import { Terminal } from 'xterm'

const props = defineProps<{
  stream: ReadableStream
}>()

const output = ref<HTMLDivElement>()
const terminal = new Terminal()

onMounted(() => terminal.open(output.value!))

watch(
  () => props.stream,
  (_stream) => {
    if (!_stream)
      return
    const reader = _stream.getReader()
    function read() {
      reader.read().then(({ done, value }) => {
        terminal.write(value)
        if (!done)
          read()
      })
    }
    read()
  },
  { flush: 'sync', immediate: true },
)
</script>

<template>
  <div>
    <div ref="output" />
  </div>
</template>
