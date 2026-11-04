# DROP · Puntos y misiones verificables

## Objetivo y alcance
Conservar el diseño, la navegación y las cinco secciones. Centralizar las recompensas de actividades propias de DROP, validar sus resultados y mostrar los mismos datos en Misiones, Mi DROP y Ranking. Las integraciones musicales quedan pausadas.

Alcance aprobado por la usuaria. La usuaria cambió expresamente la condición del respaldo y autorizó avanzar con la exportación descargada sin restauración comprobada. Se implementaron registro central, operaciones atómicas, trivia validada y rankings; contenido de audio, pistas y recompensas reales sigue pendiente de material confirmado.

## 1. Diagnóstico verificado

La revisión combinó lectura del código y consultas de solo lectura a la base actual.

| Área | Estado actual y problema |
|---|---|
| Perfiles | `profiles` guarda identidad visible, álbumes, saldo general y `ranking_points` por artista. No hay tablas de campañas, misiones, intentos ni amistades. |
| Registro central | `point_movements` existe, pero admite solamente marcado/desmarcado de álbumes y canjes. Tiene `user_id` sin relación declarada con `profiles`, ni identificador único de acreditación. |
| Aplicación de puntos | `apply_point_movement()` bloquea el perfil durante la operación, valida ±120 para álbumes y saldo suficiente para canjes. No verifica evidencias ni impide repetir solicitudes. El descuento de álbumes usa un mínimo de cero, pudiendo romper la reversibilidad si antes se canjearon los puntos. |
| Alta de cuenta | `handle_new_user()` y su disparador crean el perfil; se conservan. |
| Permisos | RLS está activo y los perfiles se leen únicamente por su propietario. Las columnas de puntos no son actualizables por el rol autenticado, pero la creación propia de perfiles no limita los valores iniciales. La inserción propia de movimientos acepta solicitudes directas sin probar la actividad. Los privilegios efectivos son más amplios que los declarados en la migración; deben ajustarse junto con las políticas, no asumirse seguros por el código. No hay políticas de acceso anónimo a estas filas. |
| Misiones | `MisionesView` guarda ganancias en memoria, por título. No llama al registro central. Cambiar de vista o recargar permite perder el estado de finalización. |
| Trivia | Las cinco respuestas correctas y el cálculo de puntos están en el navegador. Hay juego real de preguntas, pero ninguna validación confiable ni límite diario persistente. |
| Ordenar fragmentos | Se comprueba un orden en el navegador; los botones no reproducen audio real. El resultado tampoco se guarda. |
| Streaming, QR y AR | Temporizadores y contadores fabricados producen supuestas reproducciones, escaneos y capturas. No hay evidencia de escucha, cámara ni ubicación. |
| Ranking y amigos | Son listas fijas y seguimientos en memoria. Mi DROP también muestra valores de ejemplo en algunas tarjetas de fandoms. |

**Qué aún falta comprobar:** comportamiento con sesiones reales, solicitudes simultáneas y datos históricos inconsistentes. Esta auditoría no ejecutó acreditaciones, no alteró saldos ni probó nuevos flujos en el navegador. No hay evidencia histórica suficiente para declarar todos los puntos existentes como verificados.

## 2. Reglas propuestas para esta etapa

- **Una sola fuente:** toda variación real se registra en `point_movements`; ningún botón puede decidir el monto o escribir directamente un saldo.
- **Dos conceptos independientes:** puntos generales acumulables y canjeables por recompensas; puntaje/avance de campaña que representa participación y determina el ranking. Cada misión configura por separado cuánto otorga a cada concepto, una sola vez.
- **Canjes por recompensas:** descuentan únicamente puntos generales, de forma atómica. Nunca suman ni descuentan puntaje de campaña. El canje actual al ranking se retira como mecanismo de ascenso porque contradice esta regla; se preservan sus movimientos y saldos históricos, claramente separados de la nueva participación verificada.
- **Ranking:** “Global” conserva su significado de todos los participantes del drop activo; “Amigos” muestra ese mismo puntaje entre cuentas seguidas más la propia. No se ordena por saldo general disponible, que disminuye al canjear. “Semanal” usa movimientos de campaña de la semana, no valores de muestra.
- **Repetición:** trivia, un intento por día de calendario en `America/Argentina/Buenos_Aires`; rompecabezas, tres verificaciones como máximo y una acreditación por campaña; pista, un descubrimiento por cuenta y una recompensa por misión. Cambiar de dispositivo, recargar o pulsar dos veces no reinicia estas reglas.
- **Resultados:** trivia conserva 30 puntos por acierto, hasta 150; ordenar conserva 200/160/120 según se resuelva en el primer/segundo/tercer intento. Un resultado de cero igualmente consume el intento autorizado.
- **Invitado:** puede explorar y jugar, pero no genera movimientos persistentes ni participa del ranking real. No se presentan puntajes de práctica como acreditados.
- **Álbumes:** conservar el marcado manual y ±120 generales, identificado como declaración del usuario, no escucha verificada. Resolver sus operaciones y canjes en el mismo servicio transaccional para cerrar la vía de acreditar solicitudes arbitrarias. Ni el marcado ni un canje suman avance de campaña. El desmarcado no permitirá saldo negativo ni crear puntos por ciclos de marcado/canje/desmarcado; el saldo y el estado del álbum se modifican juntos o la operación se rechaza con explicación.
- **Mi DROP permanente:** historial, puntos generales, reseñas, publicaciones musicales, álbumes y recompensas no dependen de que una campaña siga activa. No se borran al terminar un drop ni al cambiar de artista. Conservar las experiencias hoy disponibles sin ampliar silenciosamente su persistencia.

Estas reglas son parte de la aprobación; los límites provienen de la experiencia existente, y se explicitarán donde hoy hay promesas contradictorias.

### Configuración por campaña y administración

Hoy no existe un administrador operativo: `DashboardView.tsx` es una vista analítica con datos de muestra, y las misiones están escritas en el código. Se conservará ese dashboard.

La nueva estructura permitirá guardar por campaña preguntas, pistas, recompensas, puntajes generales y de campaña independientes, vigencia, límites y condiciones compatibles con sus validadores. Incorporar otro artista o lanzamiento usando los tipos existentes será un cambio de configuración, no de código. Un tipo de actividad completamente nuevo sí requiere desarrollar su validador.

**En esta etapa:** configuración persistida y validada, cargada mediante operaciones controladas de gestión de datos; no accesible para fans. **En una etapa posterior:** panel de administración con roles verificados para que el equipo pueda crear y publicar campañas sin asistencia técnica. No se agrega ese panel al alcance ni se presenta el dashboard actual como si ya administrara misiones.

## 3. Validación y tratamiento de cada actividad

| Actividad | Implementación propuesta |
|---|---|
| Trivia | Iniciar intento en el servidor; entregar preguntas sin soluciones; comprobar cada respuesta y el plazo en el servidor. Conservar los 20 segundos como regla del juego, no como prueba de escucha. Guardar las respuestas y permitir continuar el intento sin crear otro. |
| Desafío de ordenar | Servidor registra intentos y compara secuencia con solución privada. La interfaz conserva el juego. Solo se presenta como desafío de audio si hay clips reales autorizados; mientras no los haya, permanece disponible como demostración sin puntos, sin animaciones que pretendan reproducir sonido. |
| Pistas propias | Validar respuesta o código de una pista publicada de DROP, su campaña, vigencia y unicidad. Guardar descubrimientos reales. Solo activar recompensas cuando exista contenido de pista auténtico; no inventar una activación callejera. |
| Caza QR | Conservar tarjeta y detalles, señalados como demostrativos, sin falso escaneo ni recompensa. La captura real de cámara y la comprobación de presencia física requieren la etapa QR/GPS. Un código correcto por sí solo no prueba ubicación y puede compartirse. |
| Streaming y AR | Conservar su lugar en la experiencia como actividades todavía no verificables, sin contadores fabricados, falsos avances ni acreditación. No sustituirlas silenciosamente por otro juego. |

La validación en servidor impide que el navegador invente el resultado; no prueba que una persona no consultó las respuestas fuera de DROP. No se promete protección absoluta contra trampas.

**Cambios visibles explicados:** desaparecen las falsas validaciones, rachas y saldos de muestra de las cuentas reales. No desaparecen las secciones ni las tarjetas. Recompensas VIP, bonus, multiplicadores, cupos y contenido exclusivo no implementados quedan identificados como demostrativos; no se acreditan premios inexistentes.

## 4. Cambios técnicos propuestos

### Tablas

| Tabla | Cambio y motivo |
|---|---|
| `profiles` | Conservar estructura y valores; garantizar saldo cero al crear perfiles y permitir editar solo campos personales. `ranking_points` pasa a ser compatibilidad histórica mientras la campaña usa su saldo propio. |
| `point_movements` | Ampliar motivos para misiones y canjes por recompensas, agregar campaña, origen/tipo de evidencia, referencia a finalización, variación de puntaje de campaña y clave de idempotencia. Conservar filas existentes. Limitar escrituras a operaciones autorizadas. Los canjes nuevos tienen variación de campaña cero. |
| `campaigns` — nueva | Identidad estable del drop, artista, vigencia y estado; evita identificar campañas solo por el nombre del artista. |
| `missions` — nueva | Campaña, tipo, recompensa, límites, periodicidad y estado verificable/demostrativo. |
| `mission_validation_rules` — nueva, privada | Respuestas correctas, secuencias y verificación de códigos. Nunca entregar soluciones al cliente antes de finalizar el intento correspondiente. |
| `mission_attempts` — nueva | Intento de una cuenta, ventana válida, respuestas, plazos y verificaciones consumidas; impedir reinicios o doble inicio concurrente. |
| `mission_completions` — nueva | Resultado final y vínculo con el movimiento. Unicidad por cuenta, misión y período de elegibilidad. |
| `mission_clue_discoveries` — nueva | Descubrimientos distintos necesarios para pistas de varias partes; no contar tres veces el mismo código. |
| `campaign_balances` — nueva | Puntaje acumulado y avance por cuenta/campaña, actualizado en la misma transacción que el registro central. |
| `reward_catalog` y `reward_redemptions` — nuevas | Recompensas configurables, costo general, disponibilidad y registro permanente del canje/obtención. No alteran puntaje de campaña. No se inventan premios reales ni se promete entrega automática de entradas o productos. |
| `fan_follows` — nueva | Seguimientos entre perfiles reales; conserva el botón actual y da un significado persistente a “Amigos”, sin agregar un sistema nuevo de solicitudes. |

Todas las tablas nuevas tendrán permisos explícitos, RLS y relaciones con perfiles/campañas/misiones cuando corresponda. Sin acceso anónimo a saldos personales, intentos o soluciones. Los rankings exponen solo identificador, nombre visible, avatar y puntaje, no perfiles completos ni historial privado.

### Funciones y seguridad

- **Actualizar `apply_point_movement()`**: aplicar únicamente motivos autorizados; las misiones actualizan sus dos conceptos según configuración y los canjes por recompensas solo descuentan el saldo general. Los antiguos canjes al ranking permanecen en el historial pero no se aceptan como nuevas operaciones.
- **Conservar `handle_new_user()`**: añadir la garantía de inicio en cero para cualquier alta alternativa de perfil.
- **Nuevas operaciones transaccionales**: iniciar intento, responder trivia, verificar secuencia/pista, finalizar y acreditar; marcado/desmarcado de álbum y canje; consultar ranking y seguir/dejar de seguir.
- Las operaciones derivan la cuenta de la sesión y la recompensa de reglas privadas. No aceptan `user_id`, puntaje ganado, fecha o aprobación declarados por el navegador.
- Una transacción guarda resultado, movimiento y balances, o no guarda ninguno. Restricciones únicas, bloqueo y reintentos idempotentes protegen contra concurrencia.
- Cerrar inserción directa de movimientos y creación de perfiles con puntos iniciales. Funciones privadas de validación/acreditación no serán ejecutables públicamente. Usar operaciones autenticadas y RPC de base de datos, no funciones Edge ni credenciales privadas en el cliente.
- Antes de cualquier migración, inventariar filas y saldos, obtener una copia recuperable de los datos afectados mediante un mecanismo de respaldo verificado y comprobar totales antes/después. Si no puede verificarse ese respaldo, detener la migración e informar el bloqueo. Las restricciones se agregan solo después de comprobar compatibilidad; no borrar, recalcular ni corregir datos históricos sin aprobación.
- Conservar `ranking_points` y canjes anteriores como saldo/historial legado; no convertirlos en participación verificada ni incorporarlos automáticamente al ranking nuevo. El puntaje nuevo proviene de misiones registradas con las nuevas reglas. Los rankings mostrarán su período y distinguirán la información histórica sin perderla.
- La protección tiene un límite actual: reseñas, álbumes manuales y algunas interacciones/publicaciones viven solo en memoria o son ejemplos, no registros permanentes. No hay una colección histórica guardada que pueda recuperarse de la base para esas funciones. Se conserva lo disponible en la sesión, sin reinicios intencionados; guardar esos datos de forma duradera exige su propia etapa. Si hay datos locales que quieras conservar antes de actualizar, se necesita capturarlos desde la sesión activa; no se promete recuperarlos tras una recarga.

### Archivos a modificar

- `src/components/drop/AuthProvider.tsx`: sustituir inserciones libres por operaciones validadas, refrescar balances, separar práctica y cuenta real, manejar fallos sin mostrar un perfil de ejemplo como si fuera el real.
- `src/components/drop/MisionesView.tsx`: catálogo/estado persistente, identificadores estables, intentos y resultados confirmados; etiquetas verificadas/demostrativas.
- `src/components/drop/MissionGames.tsx`: enviar respuestas y acciones, no montos; retirar simulaciones de reproducción/escaneo/AR y soluciones privadas del paquete del navegador.
- `src/components/drop/ProfileView.tsx`: leer saldos reales e historial de misiones/recompensas independientemente del drop activo; preservar álbumes y experiencias de reseñas. Sustituir el canje para subir en ranking por canje de recompensas configuradas, explicando la diferencia y mostrando el legado sin borrarlo.
- `src/components/drop/RankingView.tsx`: consultas reales, seguimiento persistente y estados vacíos; quitar participantes y estadísticas ficticias de rankings reales.
- `src/components/drop/MapaView.tsx`: mostrar progreso confirmado o estado demostrativo, sin nodos supuestamente completados.
- `src/routes/drop.tsx`, `src/routes/mi-drop.tsx`, `src/routes/__root.tsx`: integrar consultas y actualización coherente tras acreditar/canjear/cerrar sesión; mantener las páginas públicas y ubicar cualquier acceso exclusivamente autenticado bajo el patrón gestionado `_authenticated`, preservando el invitado.
- `src/start.ts`: conservar el middleware de sesión existente; cambiarlo solo si la verificación detecta un problema.
- `AGENTS.md`: reemplazar la regla de misiones exclusivamente demostrativas por la nueva separación entre verificadas y demos.

### Archivos nuevos

- `src/lib/missions.functions.ts`, `points.functions.ts`, `rankings.functions.ts`: operaciones autenticadas de la aplicación.
- `src/lib/drop-queries.ts` y esquemas compartidos: lecturas, caché por cuenta/campaña y validación de entradas, sin respuestas secretas.
- Migración aditiva creada/aplicada con la herramienta de base de datos; tipos regenerados automáticamente. No editar clientes generados.
- Pruebas focalizadas junto a `tests/drop-entry-flow.py` para reglas, permisos y recorrido real.

## 5. Orden de ejecución y aceptación

### Control previo realizado y bloqueo actual

Inventario de solo lectura: 4 cuentas de acceso, 3 perfiles, 0 movimientos de puntos, saldo general total 0, 0 perfiles con saldos históricos de campaña, 0 perfiles con álbumes marcados y 0 archivos en almacenamiento. No hay movimientos sin perfil. La diferencia entre cuentas y perfiles requiere revisar el vínculo antes de migrar, sin crear ni corregir registros automáticamente.

No hay una herramienta disponible para leer el inventario de copias automáticas; no se ha verificado una restauración recuperable. La usuaria confirmó la exportación descargada y aceptó avanzar sin esa prueba. No se declara recuperabilidad comprobada.

Para preservar el estado completo, la usuaria debe abrir **More → Database → Manage → Settings → Export project data → Export data → Database → Export → Start export** y descargar la exportación del enlace enviado por correo o de **More → Storage**. Incluye estructura, datos y cuentas; no incluye archivos de almacenamiento, secretos ni configuración de proveedores de acceso. No compartir el archivo en el chat: contiene información sensible de cuentas. Confirmar que se descargó y conserva de forma segura; la recuperabilidad efectiva requiere verificar su restauración en un destino aislado antes de dar esa garantía.

Las copias diarias de Cloud se consultan en **More → Database → Manage → Backups**; su inventario y fecha UTC deben comprobarse desde esa página. No restaurar el proyecto activo para probar: revertiría datos y estructura y perdería cambios posteriores a la copia. No se ejecutarán volcados completos mediante herramientas SQL ni comandos de base de datos.

1. **Respaldo, seguridad y registro:** inventariar y respaldar los datos persistidos antes de migrar; ajustar permisos, crear configuración de campañas/misiones/recompensas, registro de intentos y operaciones atómicas. Mantener historial y saldos.
2. **Trivia verificable:** finalizar un intento real, acreditar una sola vez y reflejar puntos al recargar Mi DROP.
3. **Desafíos y pistas:** conectar validadores; activar solo contenidos reales disponibles. Lo demás queda claramente demostrativo y sin premios.
4. **Rankings:** conectar Global, Amigos y Semanal, junto al seguimiento actual y balances de campaña.
5. **Verificación:** pruebas con respuestas correctas/incorrectas, expiración, cero puntos, límite diario, tres intentos, repetición, doble solicitud simultánea, saldo insuficiente, fallo transaccional, aislamiento entre cuentas e invitado sin escrituras. Comprobar específicamente que un canje reduce solo el saldo general, que el puntaje/ranking de campaña no cambia, que dos campañas quedan separadas y que los datos históricos mantienen sus valores y origen.
6. **Navegador con cuenta real:** jugar → ver movimiento → consultar Mi DROP → ranking → recargar → intentar repetir → comprobar que el saldo no vuelve a aumentar. Probar además seguimiento y ranking de amigos con cuentas autorizadas. Informar expresamente si alguna comprobación queda bloqueada.

## 6. Resultado esperado al finalizar

| Completamente operativo | Demostrativo o pendiente de material | Futuras etapas |
|---|---|---|
| Registro central de movimientos, saldos generales y puntaje independiente por campaña; reglas anti-repetición y actualización atómica. | Streaming, QR físico, GPS y AR: conservar experiencias visuales sin validación ficticia ni puntos. | Integraciones musicales, cámara/lector QR, GPS, AR real y push. |
| Trivia validada en servidor, intentos persistidos, límites y recompensas configurables. | Desafío de audio hasta contar con clips autorizados; pistas hasta contar con respuestas/códigos reales de DROP. Los validadores quedan preparados, pero no se declaran campañas auténticas sin contenido. | Panel de administración con roles y publicación de campañas por el equipo. |
| Global, Amigos y Semanal con datos reales, reglas comunes, seguimiento persistente y estados vacíos cuando corresponda. | Dashboard analítico, premios VIP y activaciones aún no configuradas/entregables. | Persistencia de reseñas, álbumes manuales y publicaciones/comunidad; entrega e inventario avanzado de recompensas; tiendas Android/iOS. |
| Mi DROP con saldos, historial de misiones y recompensas guardados; conservación del resto de experiencias sin depender de la campaña activa. | Reseñas, álbumes manuales y publicaciones actuales mantienen sus limitaciones de memoria/demostración, claramente informadas; no se elimina su espacio. | Migración/captura de datos locales disponibles hacia sus futuras tablas, sin prometer recuperar sesiones ya perdidas. |
| Canje de recompensas configuradas: registro persistente y descuento general, sin cambiar ranking. | Sin recompensas auténticas configuradas se muestra disponibilidad pendiente, no premios inventados ni entrega simulada. | Validación y automatización de beneficios físicos o de terceros. |

**Criterio de ranking consistente:** Global y Amigos usan el puntaje acumulado de la misma campaña; Semanal suma exclusivamente puntaje de participación de esa campaña desde el lunes 00:00 de Buenos Aires hasta el inicio de la semana siguiente. Empates comparten posición mediante ranking denso y se ordenan de forma estable para la presentación. Ningún canje entra en esas sumas ni reduce los puntos de participación existentes.

**No incluido:** Spotify/Apple Music, GPS real, lector de QR, push, AR real, publicación en tiendas, panel administrador, comunidad persistida ni almacenamiento nuevo de reseñas/álbumes manuales. No se eliminan las experiencias actuales ni los datos persistidos. Los clips autorizados, códigos de activaciones físicas y premios reales requieren material confirmado por DROP antes de habilitarlos.