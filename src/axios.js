import axios from 'axios';

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
})

export default {
    addNewWord(data) {
        return service.post('/addNewWord', data);
    },
    addWordCount(data) {
        return service.post('/addWordCount', data);
    },
    getWords() {
        return service.get('/words');
    },
    clearAll() {
        return service.get('/clearAll');
    }
}