const httpProxy = require('http-proxy')
const childProcess = require('child_process')

const ANKI_PATH = ''
const HOST = '0.0.0.0'
const PORT = 27701
const USER = 'username:password'

childProcess.execFile(ANKI_PATH, ['--syncserver'], {
  env: {
    SYNC_HOST: '127.0.0.1',
    SYNC_PORT: PORT,
    SYNC_USER1: USER,
    MAX_SYNC_PAYLOAD_MEGS: 100,
  }
}, (error, stdout, stderr) => {
  console.log(error);
  console.log(stdout);
  console.log(stderr);
})

httpProxy
  .createProxyServer({ target: `http://127.0.0.1:${PORT}` })
  .listen(PORT, HOST)

console.log(`Proxy to sync-server has been created: http://${HOST}:${PORT}`)
