import React from "react";
import Smiley from '../assets/images/smile.png';

class AchievementNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: Notification.permission
    };
  }

  requestPermission() {
    Notification.requestPermission().then(permission => {
      this.setState({ permission });
    });
  }

  showNotification(achievementName) {
    if (this.state.permission === "granted") {
      const notification = new Notification(`Achievement Unlocked: ${achievementName}`, {
        body: "Congratulations! You've unlocked a new achievement.",
        icon: Smiley
      });
      setTimeout(() => notification.close(), 9000); // Close notification after 5 seconds
    } else if (this.state.permission !== "denied") {
      this.requestPermission();
    }
  }

  render() {
    return null; // Notifications don't need to render anything in the DOM
  }
}

export default AchievementNotification;