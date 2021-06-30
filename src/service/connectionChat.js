import axios from 'axios'

const $axios = axios.create({
  baseURL: 'http://localhost:8081'
})

export default {
    $axios: $axios
};