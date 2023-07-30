<script setup>
 const props = defineProps({
    clima: {
        type: Object,
        required: true
    },
    ubicacion: {
        type: Boolean,
        required: true
    }
 })
</script>

<template>
  <div class="resultado">
    <h2>{{ubicacion ? 'En tu ubicacion' :`Clima de: ${clima.name}`}}</h2>
    <p class="actual">{{clima.main.temp}}&deg;C</p>
    <div class="temperaturas">
        <p>Min: <span>{{clima.main.temp_min}} &deg;C</span></p>
        <p>Max: <span>{{clima.main.temp_max}}&deg;C</span></p>
    </div>
  </div>
</template>