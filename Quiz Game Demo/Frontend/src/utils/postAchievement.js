import axios from 'axios';

const postAchievement = async (achievement, points) => {
  try {
    // Fetch existing achievements from the database
    const response = await axios.get('http://localhost:3000/achievements', { withCredentials: true });
    const existingAchievements = response.data;

    // Check if the achievement already exists
    const achievementExists = existingAchievements.some(item => item.achievement === achievement);

    if (achievementExists) {
      console.log('Achievement already exists:', achievement);
    } else {
      // Post new achievement if it does not exist
      const res = await axios.post('http://localhost:3000/achievements', { achievement, points }, { withCredentials: true });
      console.log('New achievement posted:', res.data);
    }
    return existingAchievements;
  } catch (error) {
    console.error('Error in posting achievements', error);
  }
};

export default postAchievement;
