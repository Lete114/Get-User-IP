<div align="right">
  语言:
  中文
  <a title="English" href="/README_EN.md">US</a>
</div>

<h1 align="center"><a href="https://github.com/lete114/Get-User-IP" target="_blank">Get-User-IP</a></h1>
<p align="center">一个轻量、小巧的Node.js模块，用于检索请求用户的IP地址</p>

<p align="center">
    <a href="https://github.com/Lete114/Get-User-IP/releases/"><img src="https://img.shields.io/npm/v/get-user-ip" alt="Version"></a>
    <a href="https://github.com/Lete114/Get-User-IP/tree/main"><img src="https://img.shields.io/github/package-json/v/Lete114/Get-User-IP/main?color=%231ab1ad&label=main" alt="dev"></a>
    <a href="https://github.com/Lete114/Get-User-IP/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Lete114/Get-User-IP?color=FF5531" alt="MIT License"></a>
</p>

## 安装

```bash
npm install get-user-ip --save
```

## 快速开始

```javascript
const GetUserIP = require('get-user-ip')
const http = require('http')

const server = http.createServer((req,res)=>{
  res.end(GetUserIP(req))
})

server.listen(6870)

// 如果你使用IPv4，在localhost上你会看到127.0.0.1
// 如果你使用的是IPv6，则为::1, ::fffff:127.0.0.1
```

如果有一些特殊情况的话，例如使用了`CloudFlare`就可以追加第二个参数，它是一个数组所以可以包含多个

```javascript
const server = http.createServer((req,res)=>{
  // 这时优先获取 headers.cf-connecting-ip ，如果不存在则继续按默认参数执行
  res.end(GetUserIP(req,['headers.cf-connecting-ip']))
})
```

## 它是如何工作的

它在请求中寻找特定的头信息，如果不存在，则返回`0.0.0.0`默认值

用户 IP 是由以下顺序决定的

```javascript
const defaultHeaders = [
  'headers.x-client-ip',
  'headers.x-real-ip',
  'headers.x-forwarded-for', // 该头信息会返回多个IP，格式为: (客户IP, 代理1 IP,代理2 IP...) 所以返回第一个
  'connection.remoteAddress',
  'socket.remoteAddress',
  'connection.socket.remoteAddress'
]
```
