# Explorar + nuevo Mi DROP

## Objetivo
Crear la página principal **Explorar** (descubrimiento musical) y reconstruir **Mi DROP** como identidad musical personal, integradas a la navegación existente sin romper lo ya construido ni cambiar la identidad visual.

## Lo que ya existe y se conserva
- `/` bienvenida, `/auth`, `/invitado`, `/drop` (experiencia LALI con Mapa, Misiones, Ranking, Pasaporte, Comunidad), `/mi-drop` (perfil actual con álbumes, puntos y selector de drops).
- Base de datos: perfiles, campañas, misiones, intentos, balances, movimientos de puntos, seguimientos y recompensas, todo con reglas de seguridad activas.

## Lo nuevo
1. **Ruta `/explorar`**: página principal tras ingresar, con buscador y cinco secciones (Drops de la semana, Opiniones de la comunidad, Shows cerca tuyo, Explorar por género, Artistas emergentes), en carruseles horizontales con la densidad visual pedida.
2. **Mi DROP reconstruido**: encabezado de perfil (foto, nombre, bio, seguidores/siguiendo, fecha de ingreso, editar/compartir/configuración), franja de estadísticas reales, **Mis DROPS** como colección protagonista con estados (Guardados, En curso, Completados, Finalizados) y pestañas Shows / Reseñas / Actividad / Stats. La sección Álbumes actual se conserva como pestaña propia.
3. **Navegación inferior global** de cinco accesos en Explorar, Mi DROP y Actividad: Inicio (tu drop activo), Comunidad, Explorar, Actividad, Mi DROP. La experiencia del drop (`/drop`) mantiene su barra interna actual.

## Datos reales, sin simulaciones
- **Reseñas persistentes**: nueva tabla de reseñas (álbumes, artistas y shows) vinculada al usuario. Reemplaza las reseñas de solo-sesión actuales.
- **Mis DROPS**: nueva tabla que guarda la colección personal por usuario; los estados se calculan desde la participación real (intentos y misiones completadas ya registrados).
- **Shows**: catálogo configurable de eventos (arranca con la listening party de Complejo Art Media) + registro de asistencia del usuario.
- **Perfil**: se agregan bio y nombre de usuario al perfil existente; seguidores/siguiendo salen de la tabla de seguimientos ya existente.
- Secciones sin datos suficientes (Artistas emergentes, Opiniones) muestran estado vacío con invitación a participar, nunca actividad inventada.

## Importante: cómo se aplica
Los cambios de base de datos se preparan de forma aditiva y **se aplican recién cuando aceptes este borrador**; nada se borra ni se sobrescribe. Por eso, en la vista previa del borrador las partes que dependen de tablas nuevas no se pueden probar todavía: se verifican después de aceptar. Las pantallas y la navegación sí se ven y se prueban en el borrador.

## Validación
- Recorrido móvil: Explorar → entrar al drop de LALI → Mi DROP → pestañas.
- Modo invitado: Explorar visible, Mi DROP con datos de sesión como hoy.
- Tras aceptar: guardar un drop, publicar una reseña y verificar que persisten al recargar.
