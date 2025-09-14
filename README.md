# 📞 Agenda de Contactos - Frontend

Una aplicación web moderna para gestionar contactos, construida con React, TypeScript y Vite.

## 🚀 Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar contactos
- ✅ **Búsqueda**: Buscar contactos por nombre, apellido o email
- ✅ **Interfaz Moderna**: UI responsive y atractiva con styled-components
- ✅ **TypeScript**: Tipado estático para mayor robustez
- ✅ **Validación**: Validación de formularios en tiempo real
- ✅ **Docker**: Completamente dockerizado para fácil despliegue

## 🛠️ Tecnologías

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción rápida
- **Styled Components** - CSS-in-JS para estilos
- **React Router** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP para llamadas a la API

## 📋 Campos de Contacto

Cada contacto incluye:
- **ID**: Identificador único
- **Nombre**: Nombre del contacto (2-50 caracteres)
- **Apellido**: Apellido del contacto (2-50 caracteres)
- **Teléfono**: Número de teléfono (formato válido)
- **Email**: Dirección de email (única en el sistema)

## 🏃‍♂️ Inicio Rápido

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

### Con Docker

```bash
# Construir la imagen
docker build -t agenda-contactos-frontend .

# Ejecutar el contenedor
docker run -p 3000:80 agenda-contactos-frontend
```

### Con Docker Compose (Stack Completo)

```bash
# Ejecutar frontend, backend y base de datos
docker-compose up -d

# Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend API: http://localhost:3002/api
```

## 🌐 API Backend

La aplicación consume una API REST que debe estar ejecutándose en:
- **URL por defecto**: `http://localhost:3002/api`
- **Configuración**: Variable de entorno `REACT_APP_API_URL`

### Endpoints utilizados:
- `GET /contacts` - Listar todos los contactos
- `GET /contacts/:id` - Obtener contacto por ID
- `POST /contacts` - Crear nuevo contacto
- `PUT /contacts/:id` - Actualizar contacto
- `DELETE /contacts/:id` - Eliminar contacto
- `GET /contacts?search=término` - Buscar contactos

## 📁 Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── Header.tsx     # Navegación principal
│   └── HealthCheck.tsx # Estado del backend
├── pages/             # Páginas principales
│   ├── Home.tsx       # Página de inicio
│   ├── ContactsList.tsx # Lista de contactos
│   ├── CreateContact.tsx # Crear contacto
│   └── EditContact.tsx # Editar contacto
├── services/          # Servicios de API
│   └── api.ts         # Cliente HTTP y endpoints
├── styles/            # Estilos y temas
│   ├── theme.ts       # Tema de styled-components
│   └── GlobalStyle.ts # Estilos globales
├── types/             # Definiciones de TypeScript
│   └── index.ts       # Tipos de la aplicación
└── App.tsx            # Componente raíz
```

## 🎨 Funcionalidades

### Página de Inicio
- Dashboard con acceso rápido a funciones principales
- Tarjetas de navegación hacia contactos y creación
- Lista de características destacadas

### Lista de Contactos
- Tabla responsive con todos los contactos
- Barra de búsqueda en tiempo real
- Botones de acción (editar/eliminar)
- Confirmación antes de eliminar

### Crear/Editar Contacto
- Formulario con validación en tiempo real
- Campos requeridos y formato de email/teléfono
- Manejo de errores y estados de carga
- Navegación fácil de cancelar/guardar

## 🔧 Configuración

### Variables de Entorno

Crear un archivo `.env` en la raíz:

```env
# URL de la API backend
REACT_APP_API_URL=http://localhost:3002/api
```

### Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción
npm run lint         # Ejecutar ESLint
```

## 🐳 Docker

### Dockerfile Multi-etapa

El proyecto incluye un Dockerfile optimizado:
- Etapa de construcción con Node.js
- Etapa de producción con Nginx
- Imagen final ligera (~25MB)

### Docker Compose

Stack completo con:
- Frontend (puerto 3000)
- Backend (puerto 3002)
- Base de datos MySQL (puerto 3306)

## 🔍 Testing

La aplicación ha sido probada con:
- ✅ Creación de contactos
- ✅ Edición de contactos
- ✅ Eliminación de contactos
- ✅ Búsqueda de contactos
- ✅ Validación de formularios
- ✅ Manejo de errores

## 🤝 Contribuir

1. Fork el repositorio
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crear un Pull Request

## 📄 Licencia

MIT License
