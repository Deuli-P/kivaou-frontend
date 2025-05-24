#!/bin/sh

cat <<EOF > /usr/share/nginx/html/env.js
window.env = {
  VITE_BACKEND_URL: "${VITE_BACKEND_URL}",
  VITE_ENV_MODE: "${VITE_ENV_MODE}"
};
EOF

exec nginx -g 'daemon off;'