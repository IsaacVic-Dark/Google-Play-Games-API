import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useLeaderBoard = () => {
    const [LeaderBoard, setLeaderBoard] = useState([])
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