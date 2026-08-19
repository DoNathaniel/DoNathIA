# Clients API

Endpoints para la gestión de clientes autorizados dentro de DoNathIA.

Todos los endpoints de esta sección requieren autenticación administrativa.

## Información del módulo
| Campo | Detalle |
| --- | --- |
| Módulo | Clients API |
| Versión de API | v1.0 |
| Versión de documentación | v1.0 |
| Estado | En desarrollo |
| Base path | `/api/clients` |
| Autenticación | Administrativa |
| Formato | JSON |
| Mantenedor | [DoNathaniel](https://github.com/DoNathaniel) |

---

## Crear cliente

`POST /api/clients`

Crea un nuevo cliente dentro del sistema.

### Body

```json
{
  "name": "Cliente de pruebas",
  "description": "Cliente utilizado para pruebas de la plataforma"
}
```

### Campos

| Campo         | Tipo   | Requerido | Descripción             |
| ------------- | ------ | --------- | ----------------------- |
| `name`        | string | Sí        | Nombre del cliente      |
| `description` | string | Sí        | Descripción del cliente |

### Respuesta exitosa

**HTTP `200`**

```json
{
    "requests": {
        "status": 200,
        "requestId": "f2c8e7ab-1fa3-4877-bfdb-b52b44f60c1a",
        "success": true
    },
    "message": "¡El cliente fue creado!",
    "data": {
        "id": "111e16b3-44e4-4a20-8de3-097046bdc6b4",
        "name": "Cliente de pruebas",
        "description": "Cliente utilizado para pruebas de la plataforma",
        "active": true
    }
}
```

### Posibles errores

| HTTP  | Código                           | Descripción                                                |
| ----- | -------------------------------- | ---------------------------------------------------------- |
| `400` | `MISSING_REQUIRED_FIELDS`        | Faltan parámetros requeridos o contienen valores inválidos |
| `500` | `INTERNAL_ERROR_A_CREATE_CLIENT` | Error interno al crear el cliente                          |

---

## Listar clientes

`GET /api/clients`

Obtiene todos los clientes registrados.

### Respuesta exitosa

**HTTP `200`**

```json
{
  "requests": {
    "status": 200,
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "success": true
  },
  "message": "¡Lista generada!",
  "data": {
    "clients": [
      {
        "id": "111e16b3-44e4-4a20-8de3-097046bdc6b4",
        "name": "Cliente de pruebas",
        "description": "Cliente utilizado para pruebas de la plataforma",
        "active": 1
      }
    ],
    "client_len": 1
  }
}
```

### Posibles errores

| HTTP  | Código                             | Descripción                                   |
| ----- | ---------------------------------- | --------------------------------------------- |
| `500` | `INTERNAL_ERROR_A_GET_ALL_CLIENTS` | Error interno al obtener la lista de clientes |

---

## Obtener cliente

`GET /api/clients/:id`

Obtiene la información de un cliente específico.

### Parámetros de ruta

| Parámetro | Tipo | Descripción               |
| --------- | ---- | ------------------------- |
| `id`      | UUID | Identificador del cliente |

### Ejemplo

```http
GET /api/clients/111e16b3-44e4-4a20-8de3-097046bdc6b4
```

### Respuesta exitosa

**HTTP `200`**

```json
{
  "requests": {
    "status": 200,
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "success": true
  },
  "message": "¡Información obtenida!",
  "data": {
    "client_found": true,
    "client": {
        "id": "111e16b3-44e4-4a20-8de3-097046bdc6b4",
        "name": "Cliente de pruebas",
        "description": "Cliente utilizado para pruebas de la plataforma",
        "active": true
    }
  }
}
```

### Posibles errores

| HTTP  | Código                             | Descripción                         |
| ----- | ---------------------------------- | ----------------------------------- |
| `400` | `MISSING_REQUIRED_FIELDS`          | Falta el parámetro `id`             |
| `404` | `MISSING_CLIENT`                   | El cliente solicitado no existe     |
| `500` | `INTERNAL_ERROR_A_GET_ALL_CLIENTS` | Error interno al obtener el cliente |

---

## Actualizar cliente

`PATCH /api/clients/:id`

Actualiza parcialmente la información de un cliente.

Solo se modificarán los campos incluidos en el body.

### Campos permitidos

| Campo         | Tipo    | Descripción             |
| ------------- | ------- | ----------------------- |
| `name`        | string  | Nombre del cliente      |
| `description` | string  | Descripción del cliente |
| `active`      | boolean | Estado del cliente      |

### Ejemplo

```json
{
  "name": "Encuestas Producción",
  "active": false
}
```

> Los campos no enviados permanecerán sin cambios.

### Respuesta exitosa

**HTTP `200`**

```json
{
  "requests": {
    "status": 200,
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "success": true
  },
  "message": "¡Cliente actualizado correctamente!",
  "data": {
    "updated": true,
    "reason": null,
    "client": {
      "id": "111e16b3-44e4-4a20-8de3-097046bdc6b4",
      "name": "Encuestas Producción",
      "description": "Cliente utilizado por la plataforma de encuestas",
      "active": 0
    }
  }
}
```

### Posibles errores

| HTTP  | Código                           | Descripción                            |
| ----- | -------------------------------- | -------------------------------------- |
| `400` | `MISSING_REQUIRED_FIELDS`        | Falta el parámetro `id`                |
| `400` | `NO_FIELDS_TO_UPDATE`            | No se enviaron campos válidos          |
| `404` | `MISSING_CLIENT`                 | El cliente no existe                   |
| `500` | `INTERNAL_ERROR_A_UPDATE_CLIENT` | Error interno al actualizar el cliente |
