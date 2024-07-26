import axios from 'axios'

const get = async() => {
    try {
        const res = await axios.get('http://localhost:3000/leaderBoard', { withCredentials: true })
        const data = res.data
        return data
    } catch (error) {
        console.log('error fetching data');
    }
}

export default get