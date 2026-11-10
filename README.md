# Rediseño del sitio del Colegio San José de Calasanz (Chía)

Prototipo de sitio web estático: HTML, CSS y JavaScript, sin servidor ni base de datos.

## Qué hay en esta carpeta

| Ruta | Qué es |
|---|---|
| `rediseno-calasanz/` | **El sitio.** Esta es la carpeta que se publica. |
| `rediseno-calasanz/index.html` | Inicio, con el carrusel de fotos en movimiento. |
| `rediseno-calasanz/nuestro-colegio.html` | Misión, valores, historia, campus y organigrama. |
| `rediseno-calasanz/casa-olesa.html` | Casa de Encuentros Olesa: carrusel, espacios, galería y relación con Madre Paula. |
| `rediseno-calasanz/galeria.html` | Galería de fotos dividida en Primaria y Bachillerato. |
| `rediseno-calasanz/academico.html` | Mi grado, simulador de notas, evaluación y directorio docente. |
| `rediseno-calasanz/admisiones.html` | Proceso de admisión 2027. |
| `rediseno-calasanz/bienestar.html` | Psicoorientación, salud, restaurante, rutas, biblioteca y extraescolares. |
| `rediseno-calasanz/comunicaciones.html` | Agenda, circulares, calendario, noticias y canales oficiales. |
| `rediseno-calasanz/estilos.css` | Estilos compartidos por todas las páginas. |
| `rediseno-calasanz/app.js` | Menú, animaciones, carruseles y barra de secciones. |
| `rediseno-calasanz/img/` | Escudo, fotos del colegio, Casa Olesa y noticias. |
| `archivo/` | Primer concepto de diseño. **No se publica.** |

## Ver el sitio en tu computador

- **Rápido:** doble clic en `rediseno-calasanz/index.html`.
- **En VS Code:** instala la extensión *Live Server*, haz clic derecho en `index.html` y elige **Open with Live Server**. La página se recarga sola cada vez que guardas.

## Publicarlo (Netlify, gratis)

1. Crea una cuenta en [netlify.com](https://www.netlify.com).
2. Entra a **Add new site → Deploy manually**.
3. Arrastra la carpeta `rediseno-calasanz` completa.
4. En un minuto tendrás una dirección del tipo `algo.netlify.app`.
5. Para usar el dominio del colegio, en **Domain settings** agrega `sanjosedecalasanz.edu.co`. Quien administre ese dominio debe cambiar el registro DNS que indique Netlify.

Para actualizar el sitio, vuelve a arrastrar la carpeta en la pestaña **Deploys**.

## Antes de que sea el sitio oficial

- [ ] **Autorización del colegio** para usar su nombre, escudo, fotos y datos del personal.
- [ ] **Autorización de las familias** para publicar fotos con estudiantes menores de edad, como Grado Once y la promoción 2026.
- [ ] **Quitar las marcas de prototipo.** En VS Code, busca `PROTOTIPO` en todos los archivos (Ctrl+Shift+F). En cada página:
  - Borra la línea `<meta name="robots" content="noindex, nofollow">`, que hoy impide que Google muestre el sitio.
  - Borra el `<span class="proto-note">…</span>` del pie de página.
  - En `<meta name="description">`, quita "Prototipo conceptual:" y "No es el sitio oficial."
- [ ] **Confirmar los datos pendientes** de la lista de abajo.

## Cómo cambiar las fotos del carrusel de inicio

Cada diapositiva es un bloque `<article class="slide">` dentro de `index.html`:

1. Copia la foto nueva en `rediseno-calasanz/img/`. Lo ideal es horizontal, de unos 1600 px de ancho y menos de 500 KB.
2. Copia un bloque `<article class="slide">…</article>` completo y cambia la ruta en `background-image:url('img/...')`, el título y el texto.
3. Agrega un botón más dentro de `<div class="dots">`, uno por cada diapositiva.

El carrusel cambia solo cada 7 segundos y tiene un botón para pausarlo. El de la Casa Olesa, en `casa-olesa.html`, funciona igual.

## Cómo agregar fotos a la Galería

En `galeria.html` hay dos bloques `<div class="masonry" data-gallery>`: uno en la sección Primaria y otro en Bachillerato.

1. Copia la foto en `rediseno-calasanz/img/galeria/`, con unos 1600 px como máximo.
2. Copia una línea `<button type="button" class="reveal" data-full="...">…</button>` dentro del bloque que corresponda.
3. Cambia la ruta en `data-full` y en `src`, la descripción en `alt` y el texto de `<span>`.

Para pasar una foto de Primaria a Bachillerato, basta con mover su línea `<button>` de un bloque al otro.

## Cómo cambiar los videos de "Síguenos" (inicio)

- **TikTok:** abre el video en tiktok.com y copia el número largo del final de la dirección (`.../video/7704475085377211666`). En `index.html`, reemplázalo en `https://www.tiktok.com/player/v1/NÚMERO`. Cambia también el texto de `<figcaption>`.
- **Instagram:** abre el reel y copia el código que va después de `/reel/` (por ejemplo `DdczD-Ktzuu`). Reemplázalo en `https://www.instagram.com/reel/CÓDIGO/embed/`.

## Qué sigue enlazado a sitios externos

- **PDF oficiales** (circulares, manual, PEI, SIEEM, listas de útiles): enlazan a Master2000, para que siempre se abra la versión vigente.
- **Formularios de Google**: inscripción, SQRR y encuesta de satisfacción.
- **Calendario de Google, WhatsApp y agendamiento de citas.**
- **Redes sociales:** Facebook, Instagram (@sanjosedecalasanzchia) y TikTok (@sjcalasanz). Los videos de la sección "Síguenos" se cargan desde TikTok e Instagram, que pueden guardar cookies propias.
- **Tipografías de Google Fonts.**

Si el colegio deja de usar Master2000, hay que actualizar los enlaces a los PDF.

## Datos para confirmar con el colegio

**Inicio y Nuestro colegio**
- Las fechas de Madre Paula (1799, 1829, 1847, 1859, 1889, 2001) vienen de su biografía pública, no de documentos del colegio.
- La visión del PEI dice "En el 2025…": hay que actualizarla.
- El PEI da dos cifras distintas de estudiantes actuales: 432 en el texto y 321 en la tabla.
- Casa Olesa: confirmar el origen del nombre, para qué se usa, su capacidad y su contacto.
- Organigrama: falta explicar qué es el "Ágora".
- El enlace "Identidad escolapia" (escolapiascolombia.co) se quitó de los menús porque ese dominio ya no existe. Pedir la dirección actual del sitio de las Madres Escolapias en Colombia.

**Académico**
- Varios correos del directorio tienen un espacio antes de la @, y tres no coinciden con el nombre del docente.
- En Transición, el PEI suma 35 horas de clase, pero su total dice 30.
- El SIEEM menciona una prueba "solo para el Calasanz Campestre de Medellín".

**Bienestar**
- Hay dos listas de rutas con contactos distintos, y un teléfono tiene solo 9 dígitos.
- El menú publicado del restaurante es de julio de 2026.
- No hay una lista de actividades extraescolares.
- El protocolo de salud trae un número de prueba: 300 1234567.

**Comunicaciones y Admisiones**
- La Circular 028 tiene el correo de rectoría mal escrito: "sanjosedecalasan" (le falta la z).
- La salida del miércoles aparece como 1:30 p.m. en la Circular 001 y como 1:25 en los Términos de Admisión.
- El archivo "Requerimiento de admisión" se llama "…2024.pdf" pero se usa para 2027.
