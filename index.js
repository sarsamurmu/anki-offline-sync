const httpProxy = require('http-proxy')
const childProcess = require('child_process')

const ANKI_PATH = 'C:/Users/me/AppData/Local/Programs/Anki/anki.exe'
const HOST = '0.0.0.0'
const PORT = 27701

childProcess.execFile(ANKI_PATH, ['--syncserver'], {
  env: {
    SYNC_HOST: '127.0.0.1',
    SYNC_PORT: PORT,
    SYNC_USER1: 'username:password',
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
