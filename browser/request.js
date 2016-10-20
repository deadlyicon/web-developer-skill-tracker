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

  return fetch(path, options)
}

request.Request = Request
request.Response = Response
request.Headers = Headers

export default request

request.getJSON = (path, options={}) => {
  addHeader(options, 'Content-Type', 'application/json; charset=utf-8')
  return request('GET', path, options).then(getJSON)
}

request.postJSON = (path, body=null, options={}) => {
  if (body) options.body = JSON.stringify(body)
  addHeader(options, 'Content-Type', 'application/json; charset=utf-8')
  return request('POST', path, options).then(getJSON)
}

const addHeader = (options, header, value) => {
  options.headers = options.headers || {}
  options.headers[header] = value
}

const getJSON = response =>
  response.json().then(json => {
    if (response.status >= 400) {
      const error = new Error(json.error.message)
      error.response = response
      error.json = json
      throw error
    }else{
      return json
    }
  })

window.DEBUG_request = request;
