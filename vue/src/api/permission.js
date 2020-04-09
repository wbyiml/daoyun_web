import axios from '@/config/httpConfig'

export function fetchPermission() {
    return axios.get('/permission.json')
}


