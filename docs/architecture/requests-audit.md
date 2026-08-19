# Auditoría de solicitudes HTTP

DoNathIA registra cada solicitud HTTP que alcanza la API. Este registro permite conocer qué ruta fue utilizada, cuándo se ejecutó, cuánto tardó en responder y si terminó correctamente o con un error.

No pretende reemplazar una plataforma de monitoreo completa. Por ahora es una base sencilla para depurar problemas, revisar el comportamiento de los endpoints y, más adelante, relacionar el consumo con un cliente o una key de la API.

## ¿Cómo funciona?

El middleware `requests.middleware.js` se ejecuta antes de las rutas de la aplicación. En ese momento genera dos UUID:

| Identificador | Uso |
| --- | --- |
| `requestId` | Identifica la solicitud de cara al cliente. Se envía también en el header `X-Request-Id`. |
| `auditId` | Identifica el registro interno guardado en la tabla `requests_audit`. |

El middleware crea el registro con estado `pending` y guarda información básica de la solicitud. Después, los helpers `success_res` y `error_res` actualizan ese mismo registro con el resultado final de la respuesta.

```text
Solicitud HTTP
      ↓
Middleware de auditoría crea el registro como pending
      ↓
Ruta, controlador y servicio procesan la solicitud
      ↓
success_res o error_res actualiza el resultado final
```

## Información registrada

La tabla `requests_audit` contiene los siguientes campos:

| Campo | Descripción |
| --- | --- |
| `id` | UUID interno del registro de auditoría. |
| `request_id` | UUID expuesto en la respuesta mediante `X-Request-Id`. Es único. |
| `client_id` | Cliente asociado a la solicitud. Por ahora queda disponible para uso futuro y no se completa automáticamente. |
| `method` | Método HTTP utilizado, por ejemplo `GET` o `POST`. |
| `path` | Ruta solicitada, incluyendo su URL original. |
| `ip_address` | Dirección IP detectada por Express. |
| `user_agent` | User-Agent enviado por el cliente, si existe. |
| `status` | Estado del procesamiento: `pending`, `success` o `error`. |
| `http_status` | Código HTTP devuelto por la API. |
| `error_code` | Código interno del error cuando la respuesta no fue exitosa. |
| `duration_ms` | Tiempo total de respuesta en milisegundos. |
| `created_at` | Fecha de creación del registro. |
| `finished_at` | Fecha en que se terminó de procesar la solicitud. |

## Estados del registro

| Estado | Significado |
| --- | --- |
| `pending` | La solicitud fue recibida y comenzó a procesarse. |
| `success` | La API respondió utilizando `success_res`. |
| `error` | La API respondió utilizando `error_res`. |

En una solicitud exitosa, la respuesta incluye el identificador público para poder encontrar el registro correspondiente:

```http
X-Request-Id: 550e8400-e29b-41d4-a716-446655440000
```

## Consultas útiles

Estas consultas pueden ejecutarse directamente en MySQL durante una revisión local.

### Últimas solicitudes

```sql
SELECT request_id, method, path, status, http_status, duration_ms, created_at
FROM requests_audit
ORDER BY created_at DESC
LIMIT 20;
```

### Solicitudes que terminaron con error

```sql
SELECT request_id, method, path, http_status, error_code, created_at
FROM requests_audit
WHERE status = 'error'
ORDER BY created_at DESC;
```

### Buscar una solicitud concreta

```sql
SELECT *
FROM requests_audit
WHERE request_id = '550e8400-e29b-41d4-a716-446655440000';
```

## Consideraciones actuales

- Todas las solicitudes que pasan por la aplicación se intentan registrar, incluido `/health` y los endpoints protegidos.
- Si la inserción inicial en `requests_audit` falla, la solicitud se deriva al manejador de errores de Express. Por lo tanto, la base de datos debe estar disponible incluso para consultar rutas simples.
- El estado final se actualiza cuando la respuesta utiliza `success_res` o `error_res`. Un error no controlado por esos helpers podría dejar el registro en `pending`.
- No se deben guardar credenciales, tokens ni cuerpos completos de las solicitudes en esta tabla. La auditoría actual guarda únicamente metadatos básicos.

---

La estructura de esta tabla está definida en [la migración inicial](../../database/migrations/0001_clients_base.js). A futuro, el campo `client_id` podrá utilizarse para relacionar solicitudes con clientes autenticados.
