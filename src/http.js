/**
 * ┌──────────────────────────────────┐
 * │ EasyHTTP Library                 │
 * │ Library for making HTTP Requests │
 * │                                  │
 * │ @version 3.0.0                   │
 * │ @author  Raymond Loranger        │
 * │ @license MIT                     │
 * └──────────────────────────────────┘
 **/

class EasyHTTP {
  // Response (as a promise)
  async response(resp, ok = 200) {
    if (resp.status === ok) return await resp.json()
    throw new Error(`Status ${resp.status}`)
  }

  // Make an HTTP GET Request
  async get(url) {
    const resp = await fetch(url)
    return this.response(resp)
  }

  // Make an HTTP POST Request (Create)
  async post(url, data) {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return this.response(resp, 201)
  }

  // Make an HTTP PUT Request (Update)
  async put(url, data) {
    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return this.response(resp)
  }

  // Make an HTTP DELETE Request
  async delete(url) {
    const resp = await fetch(url, {
      method: 'DELETE'
    })
    return this.response(resp)
  }
}

export const http = new EasyHTTP