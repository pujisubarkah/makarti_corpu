import { defineEventHandler, readMultipartFormData } from 'h3'
// Update the import path below to the correct location of your nhost instance/configuration.
// For example, if nhost is initialized in a file at 'server/nhost.ts', use:
import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: 'your-subdomain', // replace with your Nhost subdomain
  region: 'your-region'        // replace with your Nhost region
})
// Or, if you need to install the nhost-js-sdk, run: npm install @nhost/nhost-js

interface UploadResponse {
  url?: string
  error?: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event)
    if (!body) {
      return { error: 'Form data tidak ditemukan' }
    }
    const file = body.find(f => f.name === 'file')

    if (!file) {
      return { error: 'File tidak ditemukan' }
    }

    // Convert to File object as required by nhost.storage.upload
    const fileObj = new File([new Uint8Array(file.data)], file.filename || 'upload', { type: file.type || 'application/octet-stream' })

    const { error, fileMetadata } = await nhost.storage.upload({
      file: fileObj,
      name: file.filename,
      bucketId: 'default', // ganti jika pakai bucket lain
    })

    if (error) {
      return { error: error.message }
    }

    const url = nhost.storage.getPublicUrl({ fileId: fileMetadata.id })
    return { url }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { error: err.message }
    }
    return { error: 'Terjadi kesalahan yang tidak diketahui' }
  }
})
