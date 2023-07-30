import { ref, computed } from "vue";
import axios from 'axios'

export default function useClima() {
    const climaUbicacion = ref({});
    const clima = ref({});
    const cargando = ref(false);
    const cargandoUbicacion = ref(false);
    const errorRespuesta = ref('');
    const obtenerClima = async(ciudad) =>{
        errorRespuesta.value = '';
        cargando.value = true;
        const key = import.meta.env.VITE_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}&units=metric`

        try {
            const {data} = await axios(url)
            clima.value = data;
        } catch (error) {
            errorRespuesta.value = 'Ciudad no Encontrada';
            console.log('Ocurrio un error en la obtencion del clima: ', error);
        }finally{
            cargando.value = false;
        }
    }
    const obtenerClimaUbicacion = async(coordenadas) =>{
        errorRespuesta.value = '';
        cargandoUbicacion.value = true
        const {longitud, latitud} = coordenadas;
        const key = import.meta.env.VITE_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${key}&units=metric`

        try {
            const {data} = await axios(url)
            climaUbicacion.value = data;
        } catch (error) {
            console.log('Ocurrio un error en la obtencion del clima: ', error);
            errorRespuesta.value = 'Ciudad no Encontrada';
        }finally{
            cargandoUbicacion.value = false;
        }
    }
    const mostrarClima = computed(()=>{
        return Object.values(clima.value).length > 0
    })
    const mostrarClimaUbicacion = computed(()=>{
        return Object.values(climaUbicacion.value).length > 0
    })


    return{
        obtenerClima,
        obtenerClimaUbicacion,
        clima,
        climaUbicacion,
        mostrarClima,
        mostrarClimaUbicacion,
        cargando,
        cargandoUbicacion,
        errorRespuesta
    }
}