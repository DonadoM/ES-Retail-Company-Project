# **Retail Management System** 📦

**Descripción**  
Este proyecto es una aplicación full-stack para la gestión de una gran compañía de retail. Proporciona funcionalidades para manejar productos, clientes, pedidos, promociones, cadena de suministro. Está construido utilizando **Next.js** en el frontend, **Express** en el backend, y **MongoDB** como base de datos, con una arquitectura basada en microservicios.

## **Tabla de Contenidos**

- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## **Características Principales** 🎯

- **Gestión de productos**: Añadir, editar, eliminar y buscar productos.
- **Gestión de clientes**: Añadir, actualizar, eliminar clientes.
- **Gestión de inventario**: Actualizar y controlar el stock de productos.
- **Gestión de pedidos**: Crear, editar y borrar pedidos.
- **Gestión de promociones**: Aplicar y gestionar promociones en los productos.
- **Gestión de la cadena de suministro**: Controlar y actualizar los elementos de la cadena de suministro.
- **Autenticación y gestión de usuarios**: Crear y manejar cuentas de usuario para el sistema.

## **Tecnologías Utilizadas** 🛠️

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **Backend**: [Express.js](https://expressjs.com/), [Node.js](https://nodejs.org/)
- **Base de Datos**: [MongoDB](https://www.mongodb.com/)
- **Componentes UI**: [Radix UI](https://www.radix-ui.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Íconos**: [React Icons](https://react-icons.github.io/react-icons/)
- **Autenticación**: [JWT (JSON Web Tokens)](https://jwt.io/)

## **Requisitos Previos** ✅

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:

- [Node.js](https://nodejs.org/en/download/) (versión 14 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

## **Instalación** ⚙️

Sigue estos pasos para clonar y configurar el proyecto localmente:

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/retail-management-system.git
   cd retail-management-system
2. Instalar dependencias del frontend y backend:
   ```bash
   # Backend
   cd backend
   npm install
   ------------------
  
   # Frontend
   cd ../frontend
   npm install
   ---------------------------------
3. Configurar las variables de entorno:

Crea un archivo .env tanto en el backend como en el frontend con las variables necesarias. Aquí tienes un ejemplo:

   [Backend (/backend/.env):]

      ´´´bash
      MONGO_URI=mongodb://localhost:27017/retail-db
      JWT_SECRET=tu_secreto_jwt
     
    ´´´bash
      NEXT_PUBLIC_API_URL=http://localhost:5000/api
      
      
- Iniciar el backend:

    ´´´bash
      cd backend
      npm run dev
      Iniciar el frontend:

      ´´´bash
      cd frontend
      npm run dev
      El backend se ejecutará en http://localhost:5000 y el frontend en http://localhost:3000.

# Uso 🚀
Accede al sistema desde tu navegador en http://localhost:3000.
Utiliza la barra lateral para navegar entre las diferentes secciones de la aplicación (productos, clientes, pedidos, etc.).
En cada sección, puedes realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar).
Estructura del Proyecto 📂
bash
Copiar código


## Contribuciones 🛠️
Las contribuciones son bienvenidas. Si deseas contribuir al proyecto, sigue estos pasos:

## Haz un fork del repositorio.
-Crea una rama con la nueva funcionalidad (git checkout -b feature/nueva-funcionalidad).
-Realiza los cambios y haz commits descriptivos.
-Haz un push a tu rama (git push origin feature/nueva-funcionalidad).
-Abre un Pull Request en GitHub.
