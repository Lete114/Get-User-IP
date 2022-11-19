const defaultHeaders = [
  'headers.x-client-ip',
  'headers.x-real-ip',
  'headers.x-forwarded-for',
  'connection.remoteAddress',
  'socket.remoteAddress',
  'connection.socket.remoteAddress'
]

/**
 * Get property values dynamically
 * @param {Object} obj Object
 * @param {String} str Get object string
 * @returns {String} Object property values
 */
function GetProperty(obj, str) {
  try {
    str = str.replace(/\[(\w+)\]/g, '.$1') // Handles array subscripts
    let arr = str.split('.')
    for (const i of arr) obj = obj[i]
    return obj
  } catch (e) {}
  return null
}

/**
 * Obtain real IP address of the client
 * @param {IncomingMessage} req Request Object
 * @param {Array} headers [Options] Custom Obtain Request Object Headers Info
 * @returns {String} IP - If not, it is returned by default '0.0.0.0'
 */
function GetClientIP(req, headers = []) {
  if (Object.prototype.toString.call(req) !== '[object Object]') {
    throw new Error('"req" parameter is not legal')
  }

  headers = [...headers, ...defaultHeaders]

  for (const header of headers) {
    const ip = GetProperty(req, header)
    if (ip) {
      return ip.split(',')[0].trim()
    }
  }

  return '0.0.0.0'
}

module.exports = GetClientIP
