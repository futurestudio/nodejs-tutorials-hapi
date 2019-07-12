'use strict'

// hardcoded users object … just for illustration purposes
const users = {
  future: {
    username: 'future',
    password: '$2a$04$YPy8WdAtWswed8b9MfKixebJkVUhEZxQCrExQaxzhcdR2xMmpSJiG',   // 'studio'
    name: 'Future Studio',
    scope: [ 'user' ],
    id: '1'
  },
  admin: {
    username: 'admin',
    password: '$2a$04$YPy8WdAtWswed8b9MfKixebJkVUhEZxQCrExQaxzhcdR2xMmpSJiG',   // 'studio'
    name: 'Future Studio Admin',
    scope: [ 'admin', 'user' ],
    id: '2'
  }
}

module.exports = users