import fetch from 'isomorphic-fetch';

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export const Api = {
  rootUrl: 'http://twitter.webabile.it:3000/api/',
  get: function(url, options) {
    return fetch(this.rootUrl + url, options)
      .then(checkHttpStatus)
      .then(res => res.json())
  }
}