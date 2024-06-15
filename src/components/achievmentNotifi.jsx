import React from "react";
import AchievementNotification from "../components/achievmentNotification";

class YourComponent extends React.Component {
  handleAchievementUnlocked = () => {
    // Call the showNotification method of the AchievementNotification component
    this.notification.showNotification("Master of Vocabulary");
  };

  render() {
    return (
      <div>
        {/* Render the AchievementNotification component */}
        <AchievementNotification ref={(ref) => (this.notification = ref)} />
        <button onClick={this.handleAchievementUnlocked}>Unlock Achievement</button>
      </div>
    );
  }
}

export default YourComponent;