import axios from 'axios';

const postAchievement = async(achievement, points, userName, userId) => {
  try {
    const res = await axios.get('http://localhost:3000/achievements', { withCredentials: true })
    const data = res.data
    const duplicateFound = data.some(ach => ach.userName === userName && ach.achievement === achievement)
    
    if(!duplicateFound) {
      await axios.post('http://localhost:3000/achievements',{ achievement, points, userName, userId } , { withCredentials: true})
    }else{
      console.log('Caught a duplicate')
    }
    
  } catch (error) {
        console.log('Error in posting achievement', error)    
  }
}

export default postAchievement;
