import Fs from 'fs'
import { createHash } from 'crypto'

export const page = (name) => Fs.readFileSync(
    new URL(`pages/${name}.html`, import.meta.url)
)

export const generateEtag = (page) => createHash('md5')
    .update(page)
    .digest('hex')

export const nothingHasChanged = (request, etag) => request.headers['if-none-match'] === etag
