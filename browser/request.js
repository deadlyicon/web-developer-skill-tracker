/*
  Usage:

    request('GET', '/api/users')
      .then(responseJSON => { ... })
      .catch(response => { ... })

  NOTE: ensure fetch pollyfill is loaded
*/
const request = (method, path, options={}) => {
  options.method = method

  // enables cookies by default
  if ('credentials' in options); else {
    options.credentials = 'same-origin'
  }

  console.info('fetch', path, options)
  return fetch(path, options)
}

request.Request = Request
request.Response = Response
request.Headers = Headers

export default request

request.getJSON = (path, options={}) => {
  addHeader(options, 'Content-Type', 'application/json; charset=utf-8')
  return request('GET', path, options)
    .then(loadJSON)
}

request.postJSON = (path, body=null, options={}) => {
  options.body = JSON.stringify(body)
  addHeader(options, 'Content-Type', 'application/json; charset=utf-8')
  return request('POST', path, options)
    .then(loadJSON)
}


const addHeader = (options, header, value) => {
  options.headers = options.headers || {}
  options.headers[header] = value
}

const loadJSON = (request) =>
  request.json().then(json => {
    request.json = json
    return request
  })

window.DEBUG_request = request;
