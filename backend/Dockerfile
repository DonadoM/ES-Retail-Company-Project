# Utiliza una imagen base oficial de Node.js
FROM node:20.16.0

# Establece el directorio de trabajo en /src
WORKDIR /src

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 5000

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]