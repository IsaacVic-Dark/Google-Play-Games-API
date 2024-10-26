import { useEffect, useState } from 'react'
import axios from 'axios'
// import PostLeaderBoard from './postLeaderBoard'

const useLeaderBoard = () => {
    const [LeaderBoard, setLeaderBoard] = useState([])
    // PostLeaderBoard()
    useEffect(() => {
        const GetLeaderBoard = async() => {
            try {
                const res = await axios.get('http://localhost:3000/LeaderBoard', { withCredentials: true })
                setLeaderBoard(res.data)
            } catch (error) {
                console.error('Error in fetching LeaderBoard', error)
            }
        }
    
        GetLeaderBoard()
    }, [])
    
    return{ LeaderBoard }
}

export default useLeaderBoard

// const useLeaderBoard = async() => {
//     try {
//         const res = await axios.get('http://localhost:3000/LeaderBoard', { withCredentials: true })
//         const data = res.data
//         console.log(data)
//     } catch (error) {
//         console.log('Error in fetching leader board')
//     }
// }