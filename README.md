# SisColab

Sistema colaborativo construido con **Laravel 13 + React 18 + Vite**, usando Inertia.js como puente entre el backend y el frontend.


## Integrantes del equipo

- Gael Olker Villarroel Sanchez - Usuario GitHub: 202403325-prog
- Jhaseft Rene Saat Solares - Usuario Github Jhaseft
- Jhoel Paredes Pava - Usuario GitHub: paredes7
- Julio Elias Alba Urquieta - Usuario GitHub: elias-alba
- Pablo Arturo Torrico Lazarte - Usuario GitHub: PabloArturo77

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | PHP 8.3 · Laravel 13 · Laravel Sanctum · Inertia.js |
| Frontend | React 18 · Vite 8 · Tailwind CSS 3 · Headless UI |
| Base de datos | SQLite (por defecto) |
| Autenticación | Laravel Breeze (Inertia/React) |
| Tiempo real | WebSocket nativo (`ws`) |
| Testing | Pest 4 |

---

## Requisitos previos

Asegúrate de tener instalado en tu máquina:

- **PHP 8.3+** con las extensiones: `pdo`, `pdo_sqlite`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `fileinfo`
- **Composer 2+**
- **Node.js 20+** y **npm 10+**
- **Git**

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jhaseft/Practica_SisColab.git
cd Practica_SisColab
```

### 2. Copiar el archivo de entorno

Pide el archivo `.env` al equipo y colócalo en la raíz del proyecto.  
Si no lo tienes, puedes partir del ejemplo:

```bash
cp .env.example .env
```

### 3. Instalar dependencias PHP

```bash
composer install
```

### 4. Generar la clave de la aplicación

> Omite este paso si el `.env` que recibiste ya tiene `APP_KEY` definida.

```bash
php artisan key:generate
```

### 5. Ejecutar las migraciones

```bash
php artisan migrate
```

### 6. Instalar dependencias JavaScript

```bash
npm install
```

---

## Levantar el servidor de desarrollo

Ejecuta todos los servicios en paralelo con un solo comando:

Backend Laravel
```bash
php artisan serve
```
Servidor disponible en:http://localhost:8000

Frontend Vite
```bash
npm run dev
```
Servidor Vite (HMR) disponible en:http://localhost:5173

---

## Servidor de chat (WebSocket)

El servidor de chat usa WebSockets nativos. Para levantarlo por separado:

```bash
npm run chat
```

---

## Variables de entorno clave

| Variable | Descripción |
|----------|-------------|
| `APP_KEY` | Clave de cifrado de la app (generada con `artisan key:generate`) |
| `APP_URL` | URL base de la aplicación |
| `DB_CONNECTION` | Motor de base de datos (`sqlite` por defecto) |
| `DB_DATABASE` | Ruta al archivo SQLite o nombre de la BD |
| `SESSION_DRIVER` | Driver de sesiones (`database` por defecto) |

---

## Comandos útiles

```bash
# Limpiar caché de configuración
php artisan config:clear

# Reejecutar migraciones desde cero
php artisan migrate:fresh

# Construir assets para producción
npm run build

# Ejecutar tests
composer test
```

---

## Estructura principal

```
├── app/                  # Lógica de negocio (Controllers, Models, etc.)
├── database/
│   ├── migrations/       # Migraciones de base de datos
│   └── seeders/          # Seeders
├── resources/
│   ├── js/               # Componentes React + páginas Inertia
│   └── views/            # Plantilla blade raíz (app.blade.php)
├── routes/
│   ├── web.php           # Rutas web
│   └── auth.php          # Rutas de autenticación
├── server/
│   └── chat-server.js    # Servidor WebSocket
└── vite.config.js        # Configuración de Vite
```

---

## Licencia

MIT
---

