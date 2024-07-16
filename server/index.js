import path from 'node:path'
import fs from 'node:fs'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())

function readDirectory(dirPath) {
  const structure = {}

  const items = fs.readdirSync(dirPath, { withFileTypes: true })

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item.name)

    if (item.isDirectory()) {
      structure[item.name] = { directory: { ...readDirectory(fullPath) } }
      return
    }

    const contents = fs.readFileSync(fullPath, 'utf-8')
    structure[item.name] = { file: { contents } }
  })

  return structure
}

app.get('/webcontainer/files', (req, res) => {
  res.json({ ...readDirectory('./server/app') })
})

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })
