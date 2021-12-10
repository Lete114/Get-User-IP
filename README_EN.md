<div align="right">
  Language:
  US
  <a title="Chinese" href="/README.md">中文</a>
</div>

<h1 align="center"><a href="https://github.com/lete114/Get-User-IP" target="_blank">Get-User-IP</a></h1>
<p align="center">A lightweight, small Node.js module to retrieve the IP address of the requesting user</p>

<p align="center">
    <a href="https://github.com/Lete114/Get-User-IP/releases/"><img src="https://img.shields.io/npm/v/get-user-ip" alt="Version"></a>
    <a href="https://github.com/Lete114/Get-User-IP/tree/main"><img src="https://img.shields.io/github/package-json/v/Lete114/Get-User-IP/main?color=%231ab1ad&label=main" alt="dev"></a>
    <a href="https://github.com/Lete114/Get-User-IP/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Lete114/Get-User-IP?color=FF5531" alt="MIT License"></a>
</p>

## Installation

```bash
npm install get-user-ip --save
```

## Getting Started

```javascript
const GetUserIP = require('get-user-ip')
const http = require('http')

const server = http.createServer((req,res)=>{
  res.end(GetUserIP(req))
}))

server.listen(6870)

// on localhost you'll see 127.0.0.1 if you're using IPv4
// or ::1, ::ffff:127.0.0.1 if you're using IPv6
```

If there are some special cases, such as the use of `CloudFlare`, you can append a second parameter, which is an array so it can contain more than one params

```javascript
const server = http.createServer((req,res)=>{
  // This gives priority to getting headers.cf-connecting-ip, and if it doesn't exist, continue with the default parameters
  res.end(GetUserIP(req,['headers.cf-connecting-ip']))
}))
```

## How It Works

It looks for a specific header in the request and returns the `0.0.0.0` default if it does not exist

The user IP is determined by the following order

```javascript
const defaultHeaders = [
  'headers.x-client-ip',
  'headers.x-real-ip',
  'headers.x-forwarded-for', // This header will return multiple IP addresses, Format: (Client IP, Proxy 1 IP, Proxy 2 IP...) So return the first
  'connection.remoteAddress',
  'socket.remoteAddress',
  'connection.socket.remoteAddress'
]
```


