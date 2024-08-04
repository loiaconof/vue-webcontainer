import type { FileNode } from '@webcontainer/api'

export interface EditorFile {
  name: string
  node: FileNode
}

export type WebcontainerSatus = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'
