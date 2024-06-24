# EZHub

## 📄 Descripción

EZHub es una aplicación diseñada para facilitar la búsqueda y gestión de habitaciones para alquilar. La aplicación permite a los usuarios buscar habitaciones por geolocalización o preferencias, interactuar con el backend para gestionar usuarios, propiedades, habitaciones y transacciones, y proporcionar una experiencia fluida e intuitiva.

## Demo 🚀

Puedes ver la demostración de la aplicación en [EZHub App](https://ezhub.vercel.app/).

## ✨ Características

- **Interfaz de Usuario Intuitiva:** Diseño intuitivo y fácil de usar para una experiencia de usuario agradable.
- **Búsqueda Avanzada:** Funcionalidad de búsqueda avanzada basada en geolocalización y preferencias de usuario.
- **Integración con Backend:** Conexión directa con el backend de EZHub para gestionar datos de usuarios, propiedades y habitaciones.
- **Diseño Responsivo:** Compatible con dispositivos móviles y de escritorio para una experiencia uniforme en todas las plataformas.
- **Personalización con Tailwind CSS:** Utilización de Tailwind CSS para diseñar una interfaz moderna y atractiva.

## ☁️ Interacción con la API "EZHub"

Este proyecto frontend se integra con la API [EZHub](https://github.com/Yul1b3th/ezhub-backend) para gestionar la información de los usuarios, propiedades y habitaciones. La API, desarrollada con NestJS y TypeORM sobre Node.js, ofrece una serie de endpoints que permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos.

La API sigue los principios de una arquitectura RESTful, lo que facilita su integración y uso. Puedes explorar la [documentación](https://github.com/Yul1b3th/ezhub-backend) para conocer más detalles sobre los endpoints disponibles, los métodos HTTP que soportan y la estructura de los datos que devuelven.

## 💻 Tecnologías Utilizadas

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
- [SCSS](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Angular CLI](https://angular.dev/) version 17.1.2
- [Mapbox](https://www.mapbox.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📋 Requisitos

- Node.js y npm instalados en tu sistema. Puedes descargarlos desde [nodejs.org](https://nodejs.org/).
- Angular CLI instalado globalmente. Puedes instalarlo con el siguiente comando:

```bash
npm install -g @angular/cli
```

## 🛠️ Instalación

**✔️ Paso 1:** Levanta el servidor de base de datos, utilizando XAMPP u otra herramienta similar. Importa la base de datos utilizando el archivo **_ezhub.sql_**.

**✔️ Paso 2:** Levanta el servidor [EZHub](https://github.com/Yul1b3th/ezhub-backend)

**✔️ Paso 3:** Clona el repositorio:

```bash
git clone https://github.com/Yul1b3th/ezhub-frontend.git
```

**✔️ Paso 4:** Ingresa al directorio del proyecto:

```bash
cd ezhub-frontend
```

**✔️ Paso 5:** Copia el archivo **_.env.template_** y renómbralo como **_.env_**. Este archivo contendrá las variables de entorno necesarias para la configuración del proyecto.

**✔️ Paso 7:** Abre el archivo **_.env_** y completa las variables de entorno según las especificaciones proporcionadas en el archivo. Asegúrate de incluir la clave de acceso de MapBox u otras credenciales sensibles sin compartirlas en repositorios públicos.

**✔️ Paso 7:** Instala las dependencias:

```bash
npm install
```

## ▶️ Ejecución

Ejecuta la aplicación con el siguiente comando:

```bash
npm start
```

## 🌐 Despliegue

Para desplegar la aplicación en producción, sigue estos pasos:

**✔️ Paso 1:** Ejecuta el comando de construcción para compilar la aplicación Angular:

```bash
ng build --prod
```

**✔️ Paso 2:** Los archivos generados se almacenarán en el directorio `dist/`. Puedes desplegar estos archivos en un servidor web o en un servicio de alojamiento que admita aplicaciones web estáticas.

## 🤝 Contribuciones

Si deseas colaborar en este proyecto o informar sobre problemas, no dudes en crear un "issue" o enviar un "pull request."
