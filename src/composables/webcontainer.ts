import { WebContainer } from '@webcontainer/api'

let _webcontainerInstance: WebContainer

export default async function useWebContainer() {
  if (!_webcontainerInstance)
    _webcontainerInstance = await WebContainer.boot()

  return _webcontainerInstance
}
