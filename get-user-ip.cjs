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
 * @param { Record<string, any> } obj Object
 * @param { string } str Get object string
 * @returns { string } Object property values
 */
function get_property(obj, str) {
  try {
    str = str.replace(/\[['"]?([^'"]+)['"]?]/g, '.$1') // Handles array subscripts
    let arr = str.split('.')
    for (const i of arr) obj = obj[i]
    return obj
  } catch (e) {}
  return null
}

/**
 * Obtain real IP address of the client
 * @param { IncomingMessage } req Request Object
 * @param { string[] } headers [Options] Custom Obtain Request Object Headers Info
 * @returns { string } IP - If not, it is returned by default '0.0.0.0'
 */
function get_client_ip(req, headers = []) {
  if (Object.prototype.toString.call(req) !== '[object Object]') {
    throw new Error('"req" parameter is not legal')
  }

  headers = [...headers, ...defaultHeaders]

  for (const header of headers) {
    const ip = get_property(req, header)
    if (ip) {
      return ip.split(',')[0].trim()
    }
  }

  return '0.0.0.0'
}

module.exports = get_client_ip
module.exports.get_client_ip = get_client_ip
