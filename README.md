# Dulzein: landing page

Sitio estático (HTML + CSS, sin JavaScript ni build). EN en `/`, ES en `/es/`.

```
index.html          versión en inglés
es/index.html       versión en español
assets/styles.css   estilos (paleta del deck)
assets/*.png|svg    favicon, apple-touch-icon, imagen OG 1200×630
robots.txt, sitemap.xml
```

## Ver en local

```bash
python -m http.server 8080
```

Abrir http://localhost:8080. Hace falta un servidor (no doble clic) porque las rutas son absolutas (`/assets/...`).

## Editar

- **Google Form**: buscar `GOOGLE_FORM_URL` en `index.html` y `es/index.html` y reemplazar `https://forms.gle/REPLACE_ME` por el link del form (en Google Forms: *Enviar → 🔗 → Acortar URL*).
- **Cargos del equipo**: en la sección Team, completar `<p class="role" hidden></p>` y borrar `hidden`. Ej.: `<p class="role">Co-founder · Product</p>`.
- **Dominio**: si no es `dulzein.bio`, reemplazarlo en los dos HTML, `robots.txt` y `sitemap.xml`.
- **Imagen OG**: se generó con Pillow; para cambiarla basta con reemplazar `assets/og-image.png` (1200×630).

## Publicar (Cloudflare Pages, gratis)

1. Subir esta carpeta a un repo de GitHub (público o privado).
2. Cloudflare → Workers & Pages → Create → Pages → conectar el repo. Build command: *(vacío)*. Output directory: `/`.
3. Custom domains → agregar `dulzein.bio` (y `www`). HTTPS se activa solo.
4. Google Search Console → agregar propiedad de dominio `dulzein.bio` → verificar por DNS → Sitemaps → enviar `https://dulzein.bio/sitemap.xml` → Inspección de URL → pedir indexación de `/` y `/es/`.
5. Probar la vista previa al compartir: https://www.opengraph.xyz o el Post Inspector de LinkedIn.

Alternativas equivalentes: Netlify (arrastrar la carpeta) o GitHub Pages.

## Checklist de pendientes ⚠

- [ ] Confirmar el nombre final "Dulzein": revisar marcas en INPI y el parecido con "dulcin".
- [ ] Registrar `dulzein.bio` (y evaluar `.com` / `.com.ar`).
- [ ] Crear el Google Form y pegar el link (hoy es `REPLACE_ME`).
- [ ] Cargos del equipo (hoy están ocultos).
- [ ] Links de fuente para los rangos del roadmap (Agencia I+D+i Startup TRL 3-4, The Yield Lab Latam, Venturance). Hoy aparecen como "reference range".
- [ ] pH 2,5–8: buscar la fuente primaria antes de publicarlo (por ahora no está en la web).
- [ ] Estabilidad térmica: la web cita el paper original (4 h a 80 °C). No afirmar horneado/UHT. El dato de "2 h a 98 °C" del brief no está en esa fuente.
- [ ] No publicar todavía: TAM/SAM/SOM, costos por kg, "libre de patentes" (FTO pendiente), aprobaciones regulatorias, mentores.
- [ ] Opcional: LinkedIn del equipo/proyecto; analytics (Cloudflare Web Analytics, apagado por defecto).
