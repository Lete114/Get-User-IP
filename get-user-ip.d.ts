import { IncomingMessage } from 'http'

/**
 * Obtain real IP address of the client
 * @param req Request Object
 * @param headers [Options] Custom Obtain Request Object Headers Info
 * @returns IP - If not, it is returned by default '0.0.0.0'
 */
export function get_client_ip(req: IncomingMessage, headers?: string[]): string

export { get_client_ip as default }
