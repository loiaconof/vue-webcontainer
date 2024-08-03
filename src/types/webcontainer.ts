import type { FileNode } from '@webcontainer/api'

export interface ActiveFile {
  name: string
  node: FileNode
}

export type WebcontainerSatus = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'
