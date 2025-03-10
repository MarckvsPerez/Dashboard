# Dashboard de Redes Sociales

Un panel de control para monitorear y analizar datos de redes sociales, construido con Next.js, React y TypeScript.

## Descripción

Este proyecto es un dashboard interactivo que permite visualizar y gestionar datos de redes sociales. Proporciona análisis, tablas de datos y visualizaciones para ayudar a entender el rendimiento de las publicaciones y la interacción de los usuarios.

## Estructura del Proyecto

```
social-media-dashboard/
├── .next/                  # Archivos generados por Next.js
├── .vscode/                # Configuración de VS Code
├── node_modules/           # Dependencias del proyecto
├── public/                 # Archivos estáticos
├── src/                    # Código fuente principal
│   ├── app/                # Rutas y páginas de la aplicación
│   │   ├── api/            # Endpoints de API
│   │   ├── dashboard/      # Página del dashboard
│   │   ├── tables/         # Páginas de tablas
│   │   ├── globals.css     # Estilos globales
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Página principal
│   ├── assets/             # Recursos estáticos
│   ├── components/         # Componentes reutilizables
│   │   ├── common/         # Componentes comunes
│   │   ├── dashboard/      # Componentes del dashboard
│   │   ├── publicaciones/  # Componentes para publicaciones
│   │   ├── tables/         # Componentes de tablas
│   │   └── usuarios/       # Componentes relacionados con usuarios
│   ├── lib/                # Utilidades y funciones auxiliares
│   └── scripts/            # Scripts para tareas específicas
├── .env                    # Variables de entorno
├── .gitignore              # Archivos ignorados por Git
├── eslint.config.mjs       # Configuración de ESLint
├── next-env.d.ts           # Tipos para Next.js
├── next.config.ts          # Configuración de Next.js
├── package-lock.json       # Versiones exactas de dependencias
├── package.json            # Dependencias y scripts
├── postcss.config.mjs      # Configuración de PostCSS
├── README.md               # Documentación del proyecto
└── tsconfig.json           # Configuración de TypeScript
```

## Tecnologías Utilizadas

### Frontend:

- Next.js 15.2.1
- React 19.0.0
- TypeScript
- Tailwind CSS 4.0
- Chart.js / React-Chartjs-2
- Framer Motion
- React Icons

### Backend:

- Next.js API Routes
- MongoDB (Mongoose)

### Herramientas de Desarrollo:

- ESLint
- TypeScript
- Turbopack
- PostCSS

## Scripts Disponibles

El proyecto incluye los siguientes scripts que puedes ejecutar con npm:

- `npm install` o `npm i`: Instala todas las dependencias necesarias para el proyecto.
- `npm run dev`: Inicia el servidor de desarrollo con Turbopack en http://localhost:3000.
- `npm run build`: Crea una versión optimizada para producción de la aplicación.
- `npm run start`: Inicia la aplicación en modo producción (debe ejecutarse después de `build`).
- `npm run seed`: Alimenta la base de datos MongoDB con datos de ejemplo para pruebas.
- `npm run lint`: Ejecuta ESLint para verificar problemas de código.
- `npm run test`: Ejecuta las pruebas automatizadas (si están configuradas).

## Variables de Entorno

La aplicación requiere las siguientes variables de entorno:

- `MONGODB_URI`: URL de conexión al cluster de MongoDB. Esta URL incluye el nombre de usuario, contraseña y configuración de la base de datos.

Ejemplo:

```
MONGODB_URI=mongodb+srv://marcantoniperez:m0gL2n5XI3P2VGrt@cluster0.g9cbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/social-media-dashboard.git
   cd social-media-dashboard
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   - Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```
   MONGODB_URI=mongodb+srv://marcantoniperez:m0gL2n5XI3P2VGrt@cluster0.g9cbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

4. Alimenta la base de datos con datos iniciales:

   ```bash
   npm run seed
   ```

   Este comando ejecuta el script de semilla que crea datos de ejemplo en la base de datos MongoDB para poder probar la aplicación.

5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

Abre http://localhost:3000 en tu navegador para ver la aplicación.

## Características Principales

- Dashboard interactivo con visualizaciones de datos
- Tablas para gestionar publicaciones y usuarios
- Análisis de rendimiento de redes sociales
- Interfaz de usuario moderna y responsiva
- Integración con bases de datos para almacenamiento persistente

## Licencia

Este proyecto es privado y está destinado únicamente para uso interno.
