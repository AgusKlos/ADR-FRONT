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

### Con Docker (Imagen Individual)

```bash
# Construir la imagen
docker build -t frontend-contacts .

# Ejecutar el contenedor (solo frontend)
docker run -p 80:80 frontend-contacts
```

> **🚀 Para el stack completo (Frontend + Backend + Base de datos):**  
> **Usa el repositorio del backend ADR-BACK que incluye la orquestación completa con Docker Compose.**

## 🌐 API Backend

La aplicación consume una API REST. Para desarrollo local:
- **URL**: `http://localhost:3001/api` (desarrollo)
- **URL**: `/api` (producción con proxy reverso)
- **Configuración**: Variables de entorno `VITE_REACT_APP_API_URL`

> **🔗 Stack Completo**: Para ejecutar frontend + backend + base de datos integrados,  
> **usa el repositorio ADR-BACK que incluye la orquestación completa.**

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

Para desarrollo local, crear un archivo `.env`:

```env
# URL de la API backend (desarrollo)
VITE_REACT_APP_API_URL=http://localhost:3001/api
VITE_REACT_APP_API_BASE_URL=http://localhost:3001/api
```

> **Producción**: Las variables de entorno se configuran en el Docker Compose del backend.

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
- Imagen final ligera (~80MB)

### Stack Completo

Para el despliegue completo (Frontend + Backend + Base de datos + Proxy reverso):
- **Repositorio**: ADR-BACK
- **Comando**: `docker-compose up -d` (desde ADR-BACK)
- **Puerto**: http://localhost (todo integrado)

### Imagen en Docker Hub

```bash
# Descargar imagen
docker pull agusklos/frontend-contacts:latest

# Ejecutar (solo frontend)
docker run -p 80:80 agusklos/frontend-contacts:latest
```

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
