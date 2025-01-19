#!/bin/sh

# Remplacement des variables d'environnement dans la configuration Nginx
envsubst '${USERS_API_URL} ${BATTLE_SOCKET_URL} ${SPELLS_API_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Démarrage de Nginx
exec nginx -g "daemon off;"