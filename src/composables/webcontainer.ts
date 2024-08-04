import { type FileSystemTree, WebContainer } from '@webcontainer/api'
import { ref } from 'vue'
import type { WebcontainerSatus } from '@/types/webcontainer'

export default function useWebContainer() {
  let _webcontainerInstance: WebContainer
  const stream = ref<ReadableStream>()
  const status = ref<WebcontainerSatus>('init')
  const errorMessage = ref<string>('')

  async function startDevServer(iframe: HTMLIFrameElement, directory: FileSystemTree) {
    if (!_webcontainerInstance)
      _webcontainerInstance = await WebContainer.boot()

    _webcontainerInstance.on('server-ready', (port, url) => {
      iframe.src = url
      status.value = 'ready'
    })

    await _webcontainerInstance.mount(directory)
    status.value = 'mount'

    const installProcess = await _webcontainerInstance.spawn('pnpm', ['install'])
    stream.value = installProcess.output
    status.value = 'install'

    const installExitCode = await installProcess.exit

    if (installExitCode !== 0) {
      status.value = 'error'
      errorMessage.value = `Failed to install dependencies: error ${installExitCode}`
      return
    }

    const devProcess = await _webcontainerInstance.spawn('pnpm', ['dev'])
    stream.value = devProcess.output
    status.value = 'start'
  }

  function updateFile(filePath: string, content: string) {
    _webcontainerInstance.fs.writeFile(filePath, content)
  }

  return {
    status,
    stream,
    startDevServer,
    updateFile,
    errorMessage,
  }
}
