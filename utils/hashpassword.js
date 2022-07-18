let crypto = require('crypto')

let hashedPassword = (password)=> {
   return crypto.createHash('sha256').update(password).digest('hex')
}

module.exports = {hashedPassword}