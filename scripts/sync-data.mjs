#!/usr/bin/env node
import { promises as fs } from 'fs'
import path from 'path'

const root = path.resolve(process.cwd(), '../../..') // workspace root (md-viewer)
const pkgDir = path.resolve(process.cwd(), '..') // packages/markdown-emoji
const srcDataDir = path.join(pkgDir, 'src', 'data')

async function ensureDir(p){ await fs.mkdir(p, {recursive: true}) }

async function copyIfExists(src, dest){
  try{
    const data = await fs.readFile(src)
    await ensureDir(path.dirname(dest))
    await fs.writeFile(dest, data)
    console.log(`Synced ${path.relative(root, src)} -> ${path.relative(root, dest)}`)
  }catch(e){
    console.warn(`Skip missing ${src}`)
  }
}

async function main(){
  await ensureDir(srcDataDir)
  await copyIfExists(path.join(root, 'assets', 'emoji-unicodes.json'), path.join(srcDataDir, 'emoji-unicodes.json'))
  await copyIfExists(path.join(root, 'assets', 'emoji-aliases.json'), path.join(srcDataDir, 'emoji-aliases.json'))
}

main().catch(e => { console.error(e); process.exit(1) })

