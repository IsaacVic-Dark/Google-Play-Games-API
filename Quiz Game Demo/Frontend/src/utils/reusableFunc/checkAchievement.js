import { toast } from "react-hot-toast";
import postAchievement from "../postAchievement";
import PostLeaderBoard from "../postLeaderBoard";

const checkAchievements = async (newPoints, achievements, setAchievements, user) => {
  const achievementList = ['Good', 'Better', 'Brilliant', 'Expert', 'Experienced'];
  const newAchievement = [...achievements];
  let hasNewAchievements = false;

  achievementList.forEach((ach, idx) => {
    if (newPoints === idx + 1 && !newAchievement.includes(ach)) {
      newAchievement.push(ach);
      toast.success(`${ach} achievement unlocked`);
      hasNewAchievements = true;
    }
  });

  if (hasNewAchievements) {
    setAchievements(newAchievement);
    await saveAchievements(newAchievement, newPoints, user);
  }
};

const saveAchievements = async (achievements, points, user) => {
  const userName = user.userName;
  const userId = user.userId;
  for (const achievement of achievements) {
    await postAchievement(achievement, points, userName, userId);
    await PostLeaderBoard(userName, points)
  }
};

export default checkAchievements
