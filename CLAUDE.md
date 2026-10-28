# Fish & Chips Guatemala — contexto del proyecto

Lo común a todos los clientes está en el `CLAUDE.md` de la carpeta padre.

## Negocio
- Restaurante de mariscos y street food en Guatemala: fish and chips, camarones, ceviches.
- Tres sucursales (ver abajo). Hacen delivery a Zona 15 y Zona 16.
- El cliente pasa el material por WhatsApp y carpetas de Google Drive.

## Sucursales
| # | Nombre | Zona | Menú en la web | Estado |
|---|---|---|---|---|
| 01 | Centro San Isidro | Zona 16 | El del PDF/revista (9 categorías) + `menu-zona16.html` | Abierta. En PedidosYa |
| 02 | Fish2Go | Zona 15 | 6 tarjetas (Fish & Chips, Camarones, Ceviches, Chicken Fingers, Signature Burger, Tostitos) | Fotos del local ya integradas |
| 03 | The Court | Antigua | Vacío → "Menú próximamente" | Sin menú propio todavía |

> **Ojo:** la revista/PDF es de **Zona 16**, no de Zona 15. El cliente ya nos corrigió una vez
> porque los habíamos puesto al revés.

## Datos confirmados por el cliente
- Delivery a Zona 15 y Zona 16.
- PedidosYa es **de Zona 16**: https://www.pedidosya.com.gt/restaurantes/ciudad-de-guatemala/fish-and-chips-zona-16-7887404a-e4aa-4456-867c-0b0d570b50bc-menu
- Centro San Isidro: C.C. Centro San Isidro, Bulevar Acatán, Zona 16.
- Merch: dos camisetas, blanca "Powered By" y negra "Street Food Club". Sin precios todavía.
- Fotos de platillos y del local de Zona 15: photoshoot de **Espazio Creativo** (Drive del cliente).

## Reglas de contenido de este cliente
- **Nada inventado.** Platillos sin datos reales muestran "Más opciones próximamente" o
  "Foto próximamente"; nunca se rellenan con datos de otro platillo o de otra sucursal.
- Los tostitos **no** son lo mismo que las tostadas (el cliente ya nos lo corrigió).
- Los precios de Zona 15 todavía son los del menú de Zona 16: **pueden no coincidir**.

## Decisiones de diseño
- Identidad del cliente, respetarla: turquesa `#0a9ab4`, amarillo `#ffca03`, crema `#f6f1e7`,
  tinta `#11100e`. Titulares en Anton, texto en Inter. Bordes negros de 2–3 px y sombra dura.
- El cliente aprobó: header con botón PEDIR y sección activa marcada en amarillo, menú móvil a
  pantalla completa en turquesa, visor con zoom para la revista, tarjetas de menú expandibles.
- Las tarjetas de "El Menú" deben mantener **la misma altura por fila** (ya hubo una queja).

## Técnico
- Sitio **estático**: HTML + CSS + JS a mano, sin build ni `package.json`.
- Repositorio GitHub privado → **Hostinger** ("Despliegue desde GitHub", rama `main`,
  a `public_html`). Al hacer `push` se publica solo, tarda 1–2 minutos.
- Dominio: fishandchipsgt.com
- **El CDN de Hostinger cachea los estáticos 7 días por URL exacta.** Cada vez que cambie
  `styles.css`, `script.js`, `menu.js` o `menu-data.js` hay que subir el número de versión
  (`styles.css?v=18` → `?v=19`) en **las tres** páginas HTML, o el cliente verá la versión vieja.
- Imágenes en **WebP**. Las fotos del photoshoot vienen de Drive a 2400×1800.
- Para previsualizar: `python3 -m http.server 4329` (el 4321 lo usan otros clientes y el
  navegador mezcla el logo cacheado de otro proyecto).

### Estructura
- `index.html` — todo el inicio.
- `menu-data.js` — **todo el contenido del menú**: sucursales, categorías, platillos, precios y
  fotos. Es el único archivo que hay que tocar para cambiar el menú.
- `menu.js` — pinta el selector de sucursal, las tarjetas y la ventana de detalle.
- `menu-zona16.html` — la revista página por página, con visor y zoom.
- `menu-zona15.html` — redirección a `index.html?sucursal=zona15#menu` (enlace viejo).
- `menu-antigua.html` — placeholder.
- `assets/menu-zona16/` revista · `assets/menu-photos/` platillos · `assets/merch/` camisetas ·
  `assets/local-zona15/` local · `assets/brand/` logo original.
- `Menú Fish and Chips2026.pdf` está en `.gitignore` (pesa 35 MB).

### Marcas de git para revertir
- `antes-mejoras` — antes de las mejoras de velocidad, SEO y accesibilidad.
- `antes-header` — antes del header con botón PEDIR y menú móvil nuevo.

## Pendientes (hay que pedírselo al cliente)
- [ ] Número de WhatsApp real (`wa.me/` está vacío) y confirmar redes (@fishandchipsgt).
- [ ] Horarios y teléfono de cada sucursal.
- [ ] Dirección exacta de Zona 15 y de Antigua → activar sus botones de Google Maps y Waze.
- [ ] Menú propio de Antigua.
- [ ] Lista de platillos y precios reales de Zona 15.
- [ ] Variantes de Chicken Fingers, Signature Burger y Tostitos con Camarón.
- [ ] Precios y tallas de las camisetas; dónde se compran.
- [ ] Fotos del local de Zona 16 y de Antigua.
- [ ] Confirmar que "The Court" es el nombre correcto de la sucursal de Antigua.
- [ ] Píxel de Meta.
