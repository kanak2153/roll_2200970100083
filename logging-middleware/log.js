const axios = require('axios');


const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYW5hay4yMmdjZWJjczE3OEBnYWxnb3RpYWNvbGxlZ2UuZWR1IiwiZXhwIjoxNzUxMDE2MTg3LCJpYXQiOjE3NTEwMTUyODcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2M2U4ZDkzNy00YTE2LTQ5ZmUtYjM2MS0wNmJhYTgyOGVjMjAiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrYW5hayIsInN1YiI6ImZjNzk3YWMwLTIyMDMtNDUyNi1iZjU0LWRkOWE1ZTU2MDNlMSJ9LCJlbWFpbCI6ImthbmFrLjIyZ2NlYmNzMTc4QGdhbGdvdGlhY29sbGVnZS5lZHUiLCJuYW1lIjoia2FuYWsiLCJyb2xsTm8iOiIyMjAwOTcwMTAwMDgzIiwiYWNjZXNzQ29kZSI6Ik11YWd2cSIsImNsaWVudElEIjoiZmM3OTdhYzAtMjIwMy00NTI2LWJmNTQtZGQ5YTVlNTYwM2UxIiwiY2xpZW50U2VjcmV0IjoiUkNnd3V4YnNEVEVFTW5LVSJ9.B64E2fX1bssZe4bDWuF8Yp1yej__ZHHTw34W0t1E_DM";

async function log(stack, level, pkg, message) {
    try {
        const response = await axios.post(
            'http://20.244.56.144/evaluation-service/logs',
            {
                stack,
                level,
                package: pkg,
                message,
            },
            {
                headers: {
                    Authorization: AUTH_TOKEN,
                },
            }
        );

        console.log('[LOG SENT]', response.data);
    } catch (error) {
        console.error('[LOGGING ERROR]', error.response?.data || error.message);
    }
}

module.exports = { log };
