const querystring = require('querystring')
const superagent = require('superagent')
const URL = require('url')
const goproIp = '10.5.5.9'
const goProStreamingPort = '8080'

module.exports.getStreamingData = (request, response) => {
  superagent
    .get(`http://${goproIp}:${goProStreamingPort}${request.url}`)
    .pipe(response)
}

module.exports.sendStartStopCmd = (request, response) => {
  const queryData = URL.parse(request.url, true).query
  const pathName  = URL.parse(request.url).pathname
  const newQuery  = querystring.stringify(queryData, null, null, { encodeURIComponent: uri => uri })
  superagent
    .get(`http://${goproIp}${pathName}?${newQuery}`)
    .then(() => {
      setTimeout(() =>{
        response.writeHead(302, {
          'Location': '/'
        })
        response.end()
      }, 8000)
    })
}

module.exports.getGoProPassword = () => {
  return superagent.get(`http://${goproIp}/bacpac/sd`)
    .buffer()
    .parse(binaryParser)
    .then(res => res.body.substring(2))
}

const binaryParser = (res, callback) => {
  res.setEncoding('binary');
  res.data = '';
  res.on('data', function (chunk) {
    res.data += chunk;
  });
  res.on('end', function () {
    callback(null, res.data.toString());
  });
}
