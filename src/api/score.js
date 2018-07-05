import axios from 'axios'
import config from './config'

const serverRequest = axios.create({
    baseURL: config.domain,
    timeout: 5000
})

export default {
    getStudentList(params) {
        return serverRequest.post('/ajax_judge', params).then(({ data }) => data)
    },
    setScore(params) {
        return serverRequest.post('/ajax_judge', params).then(({ data }) => data)
    },
    getScoredList(params) {
        return serverRequest.post('/ajax_judge', params).then(({ data }) => data)
    },
}