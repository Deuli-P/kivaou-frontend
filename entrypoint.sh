#!/bin/sh
echo 'window.env ={
    VITE_BACKEND_URL: '$(echo $VITE_BACKEND_URL)',
    VITE_ENV_MODE: '$(echo $VITE_ENV_MODE)'
},' > /usr/share/nginx/html/env.js
exec nginx -g 'daemon off;'