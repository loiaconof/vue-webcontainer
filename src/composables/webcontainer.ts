import { type FileSystemTree, WebContainer } from '@webcontainer/api'
import { ref } from 'vue'

export default function useWebContainer() {
  let _webcontainerInstance: WebContainer
  const stream = ref<ReadableStream>()

  async function startDevServer(iframe: HTMLIFrameElement, directory: FileSystemTree) {
    if (!_webcontainerInstance)
      _webcontainerInstance = await WebContainer.boot()

    _webcontainerInstance.on('server-ready', (port, url) => (iframe.src = url))

    await _webcontainerInstance.mount(directory)

    const installProcess = await _webcontainerInstance.spawn('pnpm', ['install'])
    stream.value = installProcess.output

    const installExitCode = await installProcess.exit

    if (installExitCode === 0) {
      const devProcess = await _webcontainerInstance.spawn('pnpm', ['dev'])
      stream.value = devProcess.output
    }
  }

  function updateFile(filePath: string, content: string) {
    _webcontainerInstance.fs.writeFile(filePath, content)
  }

  return {
    stream,
    startDevServer,
    updateFile,
  }
}
