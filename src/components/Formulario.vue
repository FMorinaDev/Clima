<script setup>
import { onMounted, reactive, ref } from "vue";
import Alerta from "./Alerta.vue";

const ciudad = ref('')
const error = ref('');
const consultarClima = () =>{
    if (ciudad.value == '') {
        error.value = 'La ciudad es obligatoria'
        setTimeout(() => {
            error.value = ''
        }, 2000);
        return;
    }
    emit('obtener-clima', ciudad.value);
}
const emit = defineEmits(['obtener-clima','obtener-clima-ubicacion'])
const obtenerUbicacion = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // Se obtuvo la ubicación exitosamente
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;
            emit('obtener-clima-ubicacion', {longitud, latitud});
          },
          function (error) {
            // Ocurrió un error al obtener la ubicación
            console.error("Error al obtener la ubicación: " + error.message);
          }
        );
      } else {
        // El navegador no soporta la API de geolocalización
        console.error("Geolocalización no soportada en este navegador.");
      }
    }
onMounted(()=>{
    obtenerUbicacion();
})
</script>

<template>
    <form class="formulario">
        <div class="campo">
            <label for="ciudad">Ciudad</label>
            <input type="text" id="ciudad" placeholder="Ciudad" v-model="ciudad">
        </div>
        <input type="submit" value="Consultar Clima" @click.prevent="consultarClima">
        <Alerta v-if="error">{{ error }}</Alerta>
  </form>
</template>