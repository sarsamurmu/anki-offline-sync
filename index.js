const ANKI_PATH = ''
const HOST = '0.0.0.0'
const PORT = 27701
const USER = 'username:password'

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

import { createProxyServer } from 'http-proxy-3'
import childProcess from 'node:child_process'
import os from 'node:os'

childProcess.execFile(ANKI_PATH, ['--syncserver'], {
  env: {
    SYNC_HOST: '127.0.0.1',
    SYNC_PORT: PORT,
    SYNC_USER1: USER,
    MAX_SYNC_PAYLOAD_MEGS: 1000,
  }
}, (error, stdout, stderr) => {
  console.log(error)
  console.log(stdout)
  console.log(stderr)
})

if (HOST) {
  createProxyServer({ target: `http://127.0.0.1:${PORT}` })
    .listen(PORT, HOST)

  console.log(`Proxy to sync-server has been created: http://${HOST}:${PORT}`)
}
