import type { DirectoryNode, FileSystemTree } from '@webcontainer/api'
import type { EditorFile } from '@/types/webcontainer'

export function getFirstFileInDirectory(directory: FileSystemTree): EditorFile | undefined {
  const entries = Object.entries(directory)

  const files = entries.filter(([_, node]) => node.file)
  if (files.length > 0) {
    return { name: files[0][0], node: files[0][1] } as EditorFile
  }

  const directories = entries.filter(([_, node]) => node.directory)
  directories.forEach(([_, node]) => {
    return getFirstFileInDirectory((node as DirectoryNode).directory as FileSystemTree)
  })

  return undefined
}
