# Usa uma imagem base do Nginx
FROM nginx:alpine

# Remove os arquivos padr�o do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do seu projeto para a pasta padr�o do Nginx
COPY . /usr/share/nginx/html

# Exp�e a porta padr�o do Nginx
EXPOSE 80