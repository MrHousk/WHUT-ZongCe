import axios from 'axios'
import config from './config'

const serverRequest = axios.create({
    baseURL: config.domain,
    timeout: 5000
})

export default {
    login(params) {
        return serverRequest.get('/ajax_account', { params }).then(({ data }) => data)
    },
    updatePassword(params) {
        return serverRequest.post('/ajax_account', params).then(({ data }) => data)
    }
}