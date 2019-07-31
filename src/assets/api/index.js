import axios from 'axios'

const TEST_URL = `http://api.sektaschool.ru.dev.immelman.ru`;

export default{
    getResults() {
        return axios.get(TEST_URL + '/api/content/results')
    }
} 