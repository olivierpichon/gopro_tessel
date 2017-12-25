const doT = require('dot')
const fs = require('fs')
const getGoProPassword = require('./gopro').getGoProPassword
const getStreamingData = require('./gopro').getStreamingData
const http = require('http')
const sendStartStopCmd = require('./gopro').sendStartStopCmd
const tessel = require('tessel')

let GoProPassword = ''

getGoProPassword()
  .then((pwd) => GoProPassword = pwd)
  .catch((err) => {
    setTimeout(() => {
      getGoProPassword()
    }, 5000)
  })

const server = http.createServer((request, response) => {
  const {url} = request
  if (url === '/') {
    showIndex(request, response)
  } else if (url.match(/^\/bacpac\/.*/)) {
    sendStartStopCmd(request, response)
  } else {
    getStreamingData(request, response)
  }
})

const showIndex = (request, response) => {
  response.writeHead(200, {"Content-Type": "text/html"})

  fs.readFile(__dirname + '/index.html', (err, content) => {
    if (err) {
      throw err
    }

    const tempFn = doT.template(content)
    const resultText = tempFn({host: request.headers.host, gopropwd: GoProPassword})
    response.end(resultText)
  })
}

server.listen(80)
