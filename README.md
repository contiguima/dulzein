# Dulzein Bio: landing page

Sitio estático (HTML + CSS + un JS chico, sin frameworks ni build). Inglés por defecto en `/`, español en `/es/`.
Desplegado en Vercel: cada push a `main` se publica solo.

```
index.html          versión en inglés (default)
es/index.html       versión en español
assets/styles.css   estilos (estética del deck Genesis 2026)
assets/main.js      animaciones de scroll, contadores, molécula 3D, tilt de tarjetas
assets/img/         fotos del equipo, asesores y laboratorio (WebP, extraídas del deck)
assets/*.png|svg    favicon, apple-touch-icon, imagen OG 1200×630
robots.txt, sitemap.xml
```

## Estructura de la landing

Hero "Don't drop the soda, DROP THE SUGAR" → problema → alternativas → brazzeína → cómo funciona (lechuga) → mercado (precios, CAGR y panorama de empresas) → ambición + modelo B2B → roadmap (2026–2030) → equipo + galería + asesores → **Interested?** con el botón al Google Form.

## Animaciones

- **Hero**: vaso de gaseosa (SVG, burbujas animadas) y cubos de azúcar en 3D (CSS) que caen al cargar, giran y salen despedidos al scrollear. El texto sube y se desvanece.
- **Molécula de brazzeína**: modelo 3D en `<canvas>` con 54 esferas (una por aminoácido). Gira más rápido cuando scrolleás. Las coordenadas están en `PTS` dentro de `main.js`.
- **Títulos** con `data-split`: entran palabra por palabra.
- `data-reveal`: los elementos aparecen al entrar en pantalla (`left`, `right`, `pop`; demora con `style="--d:1"`).
- `data-scroll`: expone `--p` (0 a 1) según el avance del scroll. Lo usan las bandas de texto, la lechuga que crece, la galería con parallax y la molécula que recorre el roadmap. `data-scroll="out"` mide la salida del hero; `"track"` mide el roadmap.
- `data-count`: anima números (`data-from`, `data-decimals`, `data-sep`).
- `.tilt`: inclinación 3D y brillo de las tarjetas con el mouse (solo en desktop). En desktop también hay un brillo verde que sigue al cursor.
- Con "reducir movimiento" activado en el sistema, todo queda estático. Sin JavaScript, el contenido se ve completo.

## Ver en local

```bash
python -m http.server 8080
```

Abrir http://localhost:8080 (hace falta servidor: las rutas son absolutas, `/assets/...`).

## Editar

- **Google Form**: https://forms.gle/YH5h189s3psSVnnf9 (buscar `GOOGLE_FORM_URL` en `index.html` y `es/index.html` para cambiarlo).
- **Textos**: están en el HTML de cada idioma; cualquier cambio hay que hacerlo en los dos.
- **Dominio**: si no es `dulzein.bio`, reemplazarlo en los dos HTML, `robots.txt` y `sitemap.xml`.
- **Fuentes**: van como link chico (`.src`) al lado de cada cifra; no hay sección de referencias.

## Responsive

Probado sin scroll horizontal en 320, 375, 768, 1024 y 1280 px. En celular, la galería se desliza con el dedo y el roadmap pasa a vertical.

## Qué del deck NO está publicado (a propósito) ⚠

Actualizado con el deck de octubre (versión 4).

- **"Industry interest"** (Bimbo, PepsiCo, Coca-Cola, Mars, Kraft Heinz, Ingredion, Roquette): publicar esas marcas puede leerse como clientes o interés en Dulzein. En la web solo va "Business model: B2B".
- **Logos** del panorama de empresas: van solo los nombres, como texto. Conviene verificar que cada empresa trabaje efectivamente con brazzeína.

- **TAM/SAM/SOM**: las etiquetas del deck siguen inconsistentes (`US$140–200B M`).
- **Tabla de FTO** ("Public Domain (FTO)", "Potential proprietary IP"): el análisis de FTO está pendiente.
- **"GRAS organism"** y "no acumula alcaloides": pueden leerse como aprobación regulatoria y no tienen fuente.
- **Frasco "Dulzein Bio"**: sería una foto de un producto que todavía no existe. **Capturas de noticias** (slide 3).

Asesores y fotos del equipo: publicados con permiso (octubre 2026).

## Datos corregidos respecto del deck ⚠

- **CAGR 10,3 %**: la fuente es **Coherent Market Insights** (US$13,4M en 2026 → US$26,7M en 2033), no Persistence Market Research.
- **Cita de la OMS**: la web usa la frase textual del fact sheet de diabetes. "Sugar substitutes are under scrutiny too" no es una cita de la OMS.
- **"> 98 °C"** → "98 °C, 2 h" (patente US5346998, pruebas a pH 2–8).
- **"The smallest sweet protein"** → "one of the smallest" (el deck v4 lo sigue diciendo).
- **Roadmap**: el deck v4 pone "Scale it" en 2030 pero dice "First commercial agreement by 2029". La web usa **2030** en los dos lugares; conviene corregir el deck.

## Pendientes

- [ ] Links de fuente para: listado B2B (US$316–368/kg), modelo de fermentación (US$57–80/kg), artículo de Dimensions of Dental Hygiene, rangos del roadmap.
- [ ] Registrar `dulzein.bio` y revisar la marca en INPI.
