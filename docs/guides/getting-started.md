# Iniciar DoNathIA en local

Esta guía explica cómo preparar el proyecto para ejecutarlo en tu computador. La API está construida con Node.js, Express y MySQL.

## Requisitos

Antes de comenzar, asegúrate de tener instalado:

| Herramienta | Recomendación |
| --- | --- |
| Node.js | Versión LTS actual. Puedes comprobarla con `node --version`. |
| npm | Se instala junto a Node.js. Compruébalo con `npm --version`. |
| MySQL | Un servidor local o remoto al que tengas acceso. |

También necesitarás Git si vas a clonar el repositorio desde GitHub.

## Descargar e instalar

```bash
git clone https://github.com/DoNathaniel/DoNathIA.git
cd DoNathIA
npm install
```

El último comando instala tanto las dependencias de ejecución como las de desarrollo, entre ellas `nodemon` y `knex`.

## Configurar el entorno

Copia el archivo de ejemplo y edita los valores para que coincidan con tu servidor MySQL:

```bash
cp .example.env .env
```

En Windows PowerShell puedes usar:

```powershell
Copy-Item .example.env .env
```

Las variables disponibles son:

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto donde se levantará la API. Si no se define, utiliza `3000`. |
| `DATABASE_HOST` | Host de MySQL, por ejemplo `127.0.0.1`. |
| `DATABASE_PORT` | Puerto de MySQL, normalmente `3306`. |
| `DATABASE_USER` | Usuario de MySQL. |
| `DATABASE_PASS` | Contraseña del usuario de MySQL. |
| `DATABASE_DB` | Nombre de la base de datos que utilizará la API. |
| `ADMIN_KEY` | Credencial requerida para usar las rutas administrativas de clientes. |

Antes de ejecutar las migraciones, crea la base de datos indicada en `DATABASE_DB` si todavía no existe.

```sql
CREATE DATABASE donath_ia;
```

Usa el mismo nombre en el SQL y en el archivo `.env`.

## Ejecutar migraciones

Para aplicar las migraciones configuradas para desarrollo:

```bash
npm run migrate:dev
```

Actualmente, la migración disponible crea la tabla `requests_audit`, utilizada por el middleware de auditoría. Los endpoints de clientes además requieren la tabla `api_clients`; esa migración todavía no forma parte del repositorio. Si vas a trabajar con `/api/clients`, debes crear esa tabla en tu entorno o añadir la migración correspondiente antes de probar esos endpoints.

Puedes revisar el detalle del registro de solicitudes en la [documentación de auditoría](../architecture/requests-audit.md).

## Iniciar la API

Ejecuta el entorno de desarrollo con:

```bash
npm run dev
```

`nodemon` iniciará `src/server.js` y reiniciará el proceso cuando detecte cambios. Si todo está correcto, verás un mensaje similar a este:

```text
API running on port 3000
```

## Comprobar que funciona

La ruta de salud no requiere autenticación:

```bash
curl http://localhost:3000/health
```

Deberías recibir una respuesta con `status: "ok"` y el header `X-Request-Id`.

Para consultar los clientes, debes incluir el valor de `ADMIN_KEY` en el header `Authorization`:

```bash
curl http://localhost:3000/api/clients \
  -H "Authorization: tu-admin-key"
```

Revisa la [referencia de Clients API](../api/clients.md) para conocer los endpoints, cuerpos de solicitud y respuestas disponibles.

## Problemas comunes

| Problema | Qué revisar |
| --- | --- |
| No se puede conectar a MySQL | Confirma que el servicio esté iniciado y que las variables `DATABASE_*` sean correctas. |
| Las rutas devuelven un error al registrar la solicitud | Ejecuta las migraciones y comprueba que exista `requests_audit`. |
| `/api/clients` devuelve `401` | Envía el valor exacto de `ADMIN_KEY` en el header `Authorization`. |
| `/api/clients` falla por una tabla inexistente | Crea `api_clients` o incorpora su migración antes de utilizar el módulo. |
