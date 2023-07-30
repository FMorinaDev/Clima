<script setup>
  import Formulario from "./components/Formulario.vue";
  import Clima from "./components/Clima.vue";
  import Spinner from "./components/Spinner.vue";
  import Alerta from "./components/Alerta.vue";
  import useClima from "./composables/useClima";

  const { obtenerClima, obtenerClimaUbicacion, clima, climaUbicacion, mostrarClima, mostrarClimaUbicacion, cargando, cargandoUbicacion, errorRespuesta} = useClima();
</script>

<template>
  <h1 class="titulo">Buscador de clima</h1>
  <div class="contenedor buscador-clima">
    <Formulario 
    @obtener-clima="obtenerClima"
    @obtener-clima-ubicacion="obtenerClimaUbicacion"/>
    <Clima v-if="mostrarClima" :clima="clima"/>
    <Spinner v-if="cargando"/>
    <Alerta v-if="errorRespuesta">{{ errorRespuesta }}</Alerta>
  </div>
  <div class="contenedorUbicacion">
    <Spinner v-if="cargandoUbicacion"/>
    <Clima v-if="mostrarClimaUbicacion" :clima="climaUbicacion" :ubicacion="true"/>
  </div>
</template>

<style scoped>
.contenedorUbicacion{
  min-height: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
