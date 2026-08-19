# DoNathIA - API de servicios de IA local
API REST para gestionar clientes y claves de acceso, y consumir servicios de IA local como corrección, resumen, generación y mejora de textos.

*Idealmente, mantener abierta la posibilidad de un uso más libre de la IA mediante endpoints como `/chat` o `/prompt`.*

---

## ¿Por qué crear **DoNathIA**?
DoNathIA nace de mi idea de tener un *pequeño* entorno para la gestión de credenciales, dado que me encontraba experimentando con Ollama en una VPS Linux administrada mediante Dokploy. Además de facilitarme la administración de keys, llaves o credenciales para mis diferentes proyectos, en los cuales voy incorporando inteligencia artificial como funcionalidad, también me permite aprender y mejorar en la creación y diseño de APIs REST.

### ¿Uso inteligencia artificial para el desarrollo?
Y la respuesta corta es **sí**. Orgullosamente puedo decir que no utilizo un prompt del tipo `genera un sistema para... desde 0`, pero sí utilizo ChatGPT con GPT-5.6 Sol para solucionar errores, recordar conceptos, resolver dudas o buscar una idea cuando no sé muy bien cómo comenzar algo.

## Dependencias
Las dependencias marcadas como `Dev` se utilizan únicamente durante el desarrollo y no son necesarias para ejecutar la API en producción.

| Librería | Versión | Tipo | Uso | NPM |
| --- | --- | --- | --- | --- |
| `express` | 5.2.1 | Producción | Framework principal para la API REST | [npm](https://www.npmjs.com/package/express) |
| `dotenv` | 17.4.2 | Producción | Carga de variables de entorno desde `.env` | [npm](https://www.npmjs.com/package/dotenv) |
| `mysql2` | 3.23.3 | Producción | Conexión y ejecución de consultas en MySQL | [npm](https://www.npmjs.com/package/mysql2) |
| `knex` | 3.3.0 | Dev | Gestión y ejecución de migraciones de base de datos | [npm](https://www.npmjs.com/package/knex) |
| `nodemon` | 3.1.14 | Dev | Reinicio automático del servidor durante el desarrollo | [npm](https://www.npmjs.com/package/nodemon) |

---
## Documentación
La documentación la puedes encontrar en [docs/](./docs/README.md), ahi podras encontrar una tabla con toda la documentación disponible.

---

## Desarrollo y colaboración
Claramente, este proyecto se encuentra en una fase muy inicial de desarrollo, pero si alguien desea colaborar, proponer mejoras, reportar errores o simplemente experimentar con el proyecto, es completamente bienvenido.

A continuación se encuentran las instrucciones básicas para descargar el proyecto y levantar el entorno de manera local.

### Clonar el repositorio
```bash
git clone https://github.com/DoNathaniel/DoNathIA.git
cd DoNathIA
````

### Instalar dependencias
```bash
npm install
```

### Configurar variables de entorno
Crea un archivo `.env` basándote en `.example.env`:

```bash
cp .example.env .env
```

Luego configura las variables correspondientes a la conexión con MySQL y al resto de servicios utilizados por la API.

### Ejecutar las migraciones
Para crear o actualizar las tablas necesarias en la base de datos:

```bash
npx knex migrate:latest
```

### Iniciar el entorno de desarrollo
```bash
npm run dev
```

El servidor se iniciará utilizando `nodemon`, permitiendo reiniciar automáticamente la API cuando se detecten cambios en el código.

### Probar los endpoints
Actualmente utilizo **Postman** para realizar las pruebas manuales de los endpoints de la API, enviar cuerpos JSON, configurar headers de autenticación y revisar las respuestas entregadas por el servidor.

También puedes utilizar cualquier otra herramienta similar, como Insomnia, Bruno, Thunder Client o directamente `curl`.

Ejemplo:

```http
GET /api/clients
```

A medida que el proyecto avance, se irá incorporando documentación más detallada de los endpoints, parámetros disponibles y formatos de respuesta.