# Detalles de implementación

## Explorar (`/explorar`, nueva ruta)
- Encabezado "EXPLORAR" + buscador (artistas, álbumes, shows, usuarios, reseñas) que filtra el contenido real cargado.
- **Drops de la semana**: carrusel de tarjetas cuadradas grandes desde la tabla de campañas (hoy: LALI activa; María Becerra y Dillom como próximas). Cada tarjeta tiene botón para guardar el drop en Mis DROPS y entrar. "Ver todo" lleva al listado completo.
- **Opiniones de la comunidad**: reseñas reales publicadas por usuarios (álbum, artista o show, autor, calificación, acceso a leerla). Vacío hasta que haya reseñas; acceso para publicar la propia.
- **Shows cerca tuyo**: catálogo de eventos configurado (arranca con la listening party en Complejo Art Media). Sin geolocalización en esta etapa: se muestra la agenda general, etiquetada.
- **Explorar por género**: tarjetas de géneros que filtran artistas/álbumes conocidos de la plataforma.
- **Artistas emergentes**: estado vacío honesto hasta que haya datos de actividad suficientes para recomendar.

## Mi DROP (reconstrucción de `/mi-drop`)
- Encabezado: foto, nombre visible, @usuario, bio opcional, seguidores/siguiendo (de la tabla de seguimientos), fecha de ingreso, botones Editar / Compartir / Configuración.
- Franja de estadísticas calculadas: reseñas publicadas, drops en colección, shows registrados, calificación promedio.
- **Mis DROPS** destacado debajo del resumen: colección de portadas con estados Guardados / En curso / Completados / Finalizados, calculados desde la participación real; sin duplicados; los finalizados quedan en el historial.
- Pestañas: **Shows** (asistencias registradas), **Reseñas** (persistentes, con crear nueva), **Actividad** (movimientos y logros ya registrados), **Stats** (tarjetas con datos reales; sin inventar reproducciones), **Álbumes** (la sección actual, conservada tal cual).
- Perfil visible para otros usuarios en etapa posterior; en esta etapa se deja la base (datos y permisos) lista.

## Base de datos (migraciones aditivas, se aplican al aceptar el borrador)
- `profiles`: columnas nuevas `username` y `bio` (opcionales).
- `drop_saves`: colección personal (usuario, campaña, fecha en que lo guardó).
- `reviews`: reseñas persistentes (usuario, tipo: álbum/artista/show, referencia, calificación 1-5, texto, fecha).
- `shows`: catálogo de eventos (título, artista, fecha, ciudad, imagen) y `user_shows`: asistencias del usuario.
- Todas con reglas de seguridad (cada usuario lee lo público y escribe solo lo suyo) y permisos correspondientes.
- Nuevas funciones de servidor para guardar drops, publicar reseñas y registrar shows; las existentes no se tocan.

## Archivos
- Nuevos: `src/routes/explorar.tsx`, `src/routes/actividad.tsx`, componentes `ExplorarView`, `GlobalNav`, secciones de perfil (`ProfileHeader`, `MisDrops`, pestañas), `src/lib/explore.functions.ts`.
- Modificados: `src/routes/mi-drop.tsx` (nuevo perfil conservando Álbumes), `src/components/drop/AuthProvider.tsx` (exponer reseñas persistentes), `WelcomeView`/accesos para aterrizar en Explorar, metadatos de cada ruta.
- Sin tocar: la experiencia del drop, misiones, puntos, ranking, pasaporte ni el dashboard del sello.

## Qué queda fuera de esta etapa
- Geolocalización real para "cerca tuyo", recomendaciones personalizadas de artistas emergentes, perfil público de otros usuarios y panel administrativo: quedan preparados en datos, se desarrollan después.
