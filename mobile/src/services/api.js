import axios from 'axios'

const api = axios.create({
	baseURL: 'http://75a5e79f.ngrok.io/'
})

export default api