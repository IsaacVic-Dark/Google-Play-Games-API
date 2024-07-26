import axios from "axios";

const PostLeaderBoard = async (userName, points) => {
  try {
    // Fetch the current leader board from the database
    const response = await axios.get('http://localhost:3000/leaderBoard', { withCredentials: true });
    const achievements = response.data;

    let userExists = false;
    const promises = [];

    // Use forEach to iterate over the achievements
    achievements.forEach(ach => {
      if (ach.userName === userName) {
        userExists = true;
        console.log(userName, points)
        if (ach.points < points) {
          promises.push(axios.put(`http://localhost:3000/leaderBoard/${ach._id}`, { userName, points }, { withCredentials: true }));
        }
      }
    });
    

    // Wait for all update operations to complete
    await Promise.all(promises);

    // If the user does not exist in the leader board, add a new entry
    if (!userExists) {
      await axios.post('http://localhost:3000/leaderBoard', { userName, points }, { withCredentials: true });
    }

    // Fetch the updated leader board to confirm the changes
    // const updatedResponse = await axios.get('http://localhost:3000/leaderBoard', { withCredentials: true });
    // console.log('Updated LeaderBoard', updatedResponse.data);
  } catch (error) {
    console.log('Error posting to LeaderBoard', error);
  }
};


export default PostLeaderBoard;
