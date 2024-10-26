import axios from 'axios'

const fetchUsers = async() => {
    try {
        const res = await axios.get('http://localhost:3000/', { withCredentials: true })
        const data = res.data
        return data
    } catch (error) {
        console.log('error fetching users', error)
    }
}

export default fetchUsers