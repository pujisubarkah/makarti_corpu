import { imagekit } from '../utils/imagekit'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { file, fileName } = body // file base64, fileName optional

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  try {
    const response = await imagekit.upload({
      file, // base64 atau link URL
      fileName: fileName || uuidv4(),
      folder: '/uploads',
    })

    return {
      success: true,
      url: response.url,
      fileId: response.fileId,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
})
