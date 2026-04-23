# Modelo 3D — Bambu Lab X1 Carbon

Esta carpeta debe contener el archivo `printer.glb` del visor interactivo del hero.

## Descargar

1. Abre el modelo en Sketchfab: https://sketchfab.com/3d-models/bambu-lab-x1-carbon-combo-7dc00935e99047e1bfe7f5377f77f0fa
2. Inicia sesión en Sketchfab (cuenta gratuita).
3. Click en **Download 3D Model** → formato **glTF (.glb)**.
4. Guarda el archivo como `printer.glb` **en esta misma carpeta** (`assets/models/printer.glb`).

## Licencia

**CC BY 4.0** — Creative Commons Attribution. Obligatoria la atribución al autor.
**Autor:** petersonja2 (@Chase_6) en Sketchfab.
Ya incluida en el footer del sitio.

## Alternativas

Si el modelo es demasiado pesado (>10 MB) u optimización necesaria:

```bash
# Instalar gltf-pipeline (requiere Node)
npm i -g gltf-pipeline

# Comprimir con Draco (reduce ~70% el tamaño)
gltf-pipeline -i printer.glb -o printer.glb -d
```

## Mientras tanto

Si `printer.glb` no existe, el `<model-viewer>` mostrará el poster SVG estático (`assets/img/printer-poster.svg`) sin romper el layout.
