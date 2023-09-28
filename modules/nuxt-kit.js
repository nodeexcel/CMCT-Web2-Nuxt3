import { writeFileSync, ensureDirSync } from 'fs-extra'
import { resolve } from 'path'

const extractPayload = function ({ html, route }, windowNamespace) {
  let chunks = html.split(`<script>window.${windowNamespace}=`)
  let pre = chunks[0]
  let payload = chunks[1].split('</script>').shift()
  let post = chunks[1].split('</script>').slice(1).join('</script>')
  let path = route === '/' ? '' : route

  return {
    html: pre + `<script defer src="${path}/payload.js"></script>` + post,
    payload
  }
}

const writePayload = async function (payload, dir, windowNamespace) {
  // Make sure the directory exists
  ensureDirSync(dir)

  // Write payload.js file
  writeFileSync(
    resolve(dir, 'payload.js'),
    `window.${windowNamespace}=${payload}`,
    'utf-8'
  )

  // if routes are nested, ignore parent routes and extract the last one
  const nuxtContext = eval(`(${payload})`)
  const pageData = nuxtContext.data

  // Write payload.json (page data)
  writeFileSync(
    resolve(dir, 'payload.json'),
    JSON.stringify(pageData),
    'utf-8'
  )
}

export default function () {
  // Define your Nuxt Kit module here
}
