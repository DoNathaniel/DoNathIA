# Documentación de DoNathIA

En esta carpeta se reúne la documentación técnica del proyecto. La idea es que cada módulo tenga un lugar claro donde explicar qué hace, cómo se utiliza y qué cosas quedan pendientes por mejorar.

DoNathIA todavía se encuentra en una etapa inicial, por lo que algunos documentos describen funcionalidades en desarrollo. Cuando una característica no esté completamente lista, se indicará para evitar confusiones.

## Documentación disponible

| Documento | Descripción |
| --- | --- |
| [Guía de inicio](./guides/getting-started.md) | Requisitos, configuración local y pasos para levantar la API. |
| [Clients API](./api/clients.md) | Endpoints disponibles para crear, consultar y actualizar clientes. |
| [Auditoría de solicitudes](./architecture/requests-audit.md) | Funcionamiento del registro de solicitudes HTTP y su información almacenada. |

---

## Estructura de la documentación

```text
docs/
├── api/            # Referencia de endpoints y contratos de la API
├── architecture/   # Decisiones y componentes internos
└── guides/         # Guías prácticas para desarrollar y utilizar el proyecto
```

Si vas a añadir una funcionalidad nueva, intenta acompañarla con su documentación correspondiente. Aunque sea breve, ayuda bastante a mantener claro el propósito de cada parte del proyecto.
