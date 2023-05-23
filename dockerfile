# Usar una imagen base de Node.js
FROM node:latest

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json e instalar las dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto en el que el servidor de Node.js está escuchando
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]
