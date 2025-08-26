<template>
  <div ref="mapRef" class="w-full h-[400px] rounded-xl shadow-lg border-2 border-blue-400 overflow-hidden" />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Overlay from 'ol/Overlay'
import { Icon, Style } from 'ol/style'
import { fromLonLat } from 'ol/proj'

// Koordinat LAN RI EPSG:4326
const lanLonLat = [106.828014, -6.169150]
// Konversi ke EPSG:3857
const lanWebMercator = fromLonLat(lanLonLat)

const mapRef = ref(null)

onMounted(async () => {
  await nextTick()
  if (!mapRef.value) return

  // Marker LAN RI (segitiga biru)
  const marker = new Feature({
    geometry: new Point(lanWebMercator)
  })
  marker.setStyle(
    new Style({
      image: new Icon({
        src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><polygon points="16,4 28,28 4,28" fill="%23007bff" stroke="white" stroke-width="2"/></svg>',
        anchor: [0.5, 1],
        scale: 1
      })
    })
  )

  const vectorSource = new VectorSource({
    features: [marker]
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource
  })

  // Tooltip overlay
  const tooltip = document.createElement('div')
  tooltip.className = 'ol-tooltip'
  tooltip.style.background = 'white'
  tooltip.style.padding = '8px 12px'
  tooltip.style.borderRadius = '8px'
  tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
  tooltip.style.fontSize = '14px'
  tooltip.style.color = '#1e293b'
  tooltip.innerHTML = `<b>Lembaga Administrasi Negara</b><br>Jl. Veteran No. 10 Jakarta Pusat`

  const overlay = new Overlay({
    element: tooltip,
    position: lanWebMercator,
    positioning: 'bottom-center',
    offset: [0, -32]
  })

  const map = new Map({
    target: mapRef.value,
    layers: [
      new TileLayer({
        source: new OSM()
      }),
      vectorLayer
    ],
    view: new View({
      center: lanWebMercator,
      zoom: 16
    }),
    overlays: [overlay]
  })
})
</script>

<style scoped>
div {
  min-height: 400px;
  width: 100%;
}
.ol-tooltip {
  pointer-events: none;
  z-index: 20;
}
</style>
