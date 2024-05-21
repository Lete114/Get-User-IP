import { equal, strictEqual } from 'assert'
import GetUserIP from '../get-user-ip.mjs'

const IP = '999.999.999.999'
const defaultIP = '0.0.0.0'

it('Request is undefined', () => {
  const reg = /"req" parameter is not legal/g
  let error = ''
  try {
    GetUserIP()
  } catch (e) {
    error = e.toString()
  }
  equal(reg.test(error), true)
})

describe('Request Headers', () => {
  it('Request Headers is undefined', () => {
    const req = {}
    const res = GetUserIP(req)
    equal(res, defaultIP)
  })

  it('Request Headers failed to get return 0.0.0.0', () => {
    const req = { headers: true }
    const result = GetUserIP(req)
    strictEqual(result, defaultIP)
  })

  it('x-client-ip', () => {
    const req = {
      headers: {
        'x-client-ip': IP
      }
    }
    strictEqual(GetUserIP(req), IP)
  })

  it('x-real-ip', () => {
    const req = {
      headers: {
        'x-real-ip': IP
      }
    }
    strictEqual(GetUserIP(req), IP)
  })

  it('x-forwarded-for', () => {
    const IPS = '999.999.999.999, 888.888.888.888, 777.777.777.777'
    const req = {
      headers: {
        'x-forwarded-for': IPS
      }
    }
    strictEqual(GetUserIP(req), IP)
  })
})

describe('Request Connection', () => {
  it('Request Connection is undefined', () => {
    const req = {}
    const res = GetUserIP(req)
    equal(res, defaultIP)
  })

  it('Request Connection Socket is undefined', () => {
    const req = {}
    const res = GetUserIP(req)
    equal(res, defaultIP)
  })

  it('connection.remoteAddress', () => {
    const req = {
      connection: {
        remoteAddress: IP
      }
    }
    strictEqual(GetUserIP(req), IP)
  })

  it('connection.socket.remoteAddress', () => {
    const req = {
      connection: {
        socket: { remoteAddress: IP }
      }
    }
    strictEqual(GetUserIP(req), IP)
  })
})

describe('Request Socket', () => {
  it('Request Socket is undefined', () => {
    const req = {}
    const res = GetUserIP(req)
    equal(res, defaultIP)
  })

  it('socket.remoteAddress', () => {
    const req = {
      socket: {
        remoteAddress: IP
      }
    }
    strictEqual(GetUserIP(req), IP)
  })
})

describe('Custom Request Headers', () => {
  it('Custom Request Headers is undefined', () => {
    const req = {}
    const res = GetUserIP(req)
    equal(res, defaultIP)
  })

  // Return to Custom
  it('cf-connecting-ip', () => {
    const req = {
      headers: {
        'cf-connecting-ip': IP
      }
    }
    strictEqual(GetUserIP(req, ['headers.cf-connecting-ip']), IP)
  })

  // Whether to Return cf-connecting-ip
  it('cf-connecting-ip || x-client-ip', () => {
    const req = {
      headers: {
        'x-client-ip': '888.888.888.888',
        'cf-connecting-ip': IP // 999.999.999.999
      }
    }
    strictEqual(GetUserIP(req, ['headers.cf-connecting-ip']), IP)
  })
})

describe('JavaScript dynamic syntax', () => {
  it('dynamic syntax', () => {
    const req = {
      headers: {
        'cf-connecting-ip': IP
      }
    }
    strictEqual(GetUserIP(req, ['headers[cf-connecting-ip]']), IP)
    strictEqual(GetUserIP(req, [`headers['cf-connecting-ip']`]), IP)
    strictEqual(GetUserIP(req, ['headers["cf-connecting-ip"]']), IP)
    strictEqual(GetUserIP(req, [`headers['cf-connecting-ip"]`]), IP)
    strictEqual(GetUserIP(req, [`headers["cf-connecting-ip']`]), IP)
  })
})
