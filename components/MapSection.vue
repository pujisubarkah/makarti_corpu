<template>
  <div class="col-md-12 card-body">
    <div id="map" ref="mapContainer" style="height: 600px; border-radius: 3.2px; position: relative; outline-style: none;"></div>
    <div id="info-click" style="float:right;font-style:italic;font-size:13px;">
      *Klik titik di peta untuk melihat informasi.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
let map: any = null
const mapContainer = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (typeof window !== 'undefined') {
    // Dynamically import leaflet to avoid SSR issues
    const L = await import('leaflet')
    if (mapContainer.value) {
      map = L.map(mapContainer.value).setView([-6.200000, 106.816666], 5)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      // Example: click event to show info
      map.on('click', function(e: any) {
        alert(`Koordinat: ${e.latlng.lat}, ${e.latlng.lng}`)
      })
    }
  }
})
</script>

<style scoped>
@import 'leaflet/dist/leaflet.css';
</style>
