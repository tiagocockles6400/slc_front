# Usa uma imagem base do Nginx
FROM nginx:alpine

# Remove os arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do seu projeto para a pasta padrão do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80