import React from "react";
import CoachNavBar from "../components/coachDashboard/CoachNavBar";
import CoachMsgAndInstruction from "../components/coachDashboard/CoachMsgAndInstructions";
import UserVideoForCoach from "../components/coachDashboard/UserVideoForCoach";

const CoachDashboard = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <UserVideoForCoach />
      </div>
    </div>
  );
};

export default CoachDashboard;
