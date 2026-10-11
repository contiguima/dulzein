# Dulzein Bio: landing page

Sitio estático (HTML + CSS + un JS chico, sin frameworks ni build). Inglés por defecto en `/`, español en `/es/`.
Desplegado en Vercel: cada push a `main` se publica solo.

```
index.html          versión en inglés (default)
es/index.html       versión en español
assets/styles.css   estilos (estética del deck Génesis 2026)
assets/main.js      interacciones de scroll: revelado, contadores, HUD de niveles, molécula 3D
assets/*.png|svg    favicon, apple-touch-icon, imagen OG 1200×630
robots.txt, sitemap.xml
```

## La experiencia de scroll

- Cada sección es un **nivel** (`data-level="..."`). El HUD de abajo a la izquierda muestra el nivel actual y la barra de arriba, el progreso.
- **Molécula de brazzeína**: un modelo 3D en `<canvas>` con 54 esferas (una por aminoácido). Gira más rápido cuando scrolleás. Las coordenadas están en `PTS` dentro de `main.js`.
- `data-reveal` hace aparecer elementos al entrar en pantalla (`left`, `right`, `pop`; demora con `style="--d:1"`).
- `data-scroll` expone `--p` (0 a 1) según el avance del scroll: hace crecer la lechuga, mueve la molécula del roadmap y hace caer los cubos de azúcar.
- `data-count` anima números (`data-from`, `data-decimals`, `data-sep`).
- Con "reducir movimiento" activado en el sistema, todo queda estático. Sin JavaScript, el contenido se ve completo.

## Ver en local

```bash
python -m http.server 8080
```

Abrir http://localhost:8080 (hace falta servidor: las rutas son absolutas, `/assets/...`).

## Editar

- **Google Form**: buscar `GOOGLE_FORM_URL` en `index.html` y `es/index.html` y reemplazar `https://forms.gle/REPLACE_ME`.
- **Textos**: están en el HTML de cada idioma; cualquier cambio hay que hacerlo en los dos.
- **Dominio**: si no es `dulzein.bio`, reemplazarlo en los dos HTML, `robots.txt` y `sitemap.xml`.

## Publicación

Vercel ya está conectado al repo. Para el dominio: Vercel → Project → Settings → Domains.
Después: Google Search Console → agregar `dulzein.bio` → enviar `https://dulzein.bio/sitemap.xml` → pedir indexación de `/` y `/es/`.

## Qué del deck NO está publicado (a propósito) ⚠

- **TAM/SAM/SOM**: las etiquetas del deck siguen inconsistentes (`US$140–200B M`).
- **Libertad de operación ("full FTO")** y "non-transgenic simplifies regulatory pathways": el análisis de FTO está pendiente; no se afirma.
- **"Recognized as GRAS"**: puede leerse como aprobación regulatoria de la brazzeína. Se reemplazó por "un cultivo alimenticio conocido".
- **Asesores** (nombres y fotos): falta el permiso explícito de cada uno.
- **Fotos** del equipo, del fruto, de la lechuga y del frasco: derechos o consentimiento sin confirmar. El frasco "Dulzein Bio" sería una foto de producto que todavía no existe.
- **Capturas de noticias** (slide 3).

## Datos corregidos respecto del deck ⚠

- **CAGR 10,3 %**: la fuente es **Coherent Market Insights** (US$13,4M en 2026 → US$26,7M en 2033), no Persistence Market Research. Conviene corregirlo en el deck.
- **Cita de la OMS**: la frase del deck ("went from 200 million to 830 million in three decades") no es textual. La web usa la frase textual del fact sheet. "Sugar substitutes are under scrutiny too" no es una cita de la OMS: no se usa.
- **"> 98 °C"**: la fuente (patente US5346998) dice "still tasted very sweet after two hours of incubation at 98 °C", con pruebas a pH 2, 4, 6 y 8. La web dice "98 °C, 2 h", no "más de 98 °C".
- **"The smallest sweet protein"** → "one of the smallest".

## Pendientes

- [ ] Link del Google Form.
- [ ] Links de fuente para: listado B2B (US$316–368/kg), modelo de fermentación (US$57–80/kg), artículo de Dimensions of Dental Hygiene, rangos del roadmap (Agencia I+D+i, The Yield Lab Latam, Venturance).
- [ ] Registrar `dulzein.bio` y revisar la marca en INPI.
- [ ] Opcional: fotos del equipo (con consentimiento de cada persona), LinkedIn, analytics (Vercel Analytics, apagado por defecto).
