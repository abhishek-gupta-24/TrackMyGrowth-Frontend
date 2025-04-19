import React from "react";
import { Header, UserInfo, RightCardsContainer, RightMiddleCards, BottomGraph } from "../components";

function Profile() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Header />
      <div className="flex flex-col  md:flex-row px-2 sm:px-4 py-2 sm:py-4 gap-2 sm:gap-4 max-w-7xl mx-auto">
        <div className="w-full md:w-1/4 max-w-xs">
          <UserInfo />
        </div>
        <div className="w-full md:w-3/4 flex flex-col sm:gap-6">
          <div className="w-full">
            <RightCardsContainer />
          </div>
          <div className="w-full">
            <RightMiddleCards />
          </div>
          <div className="w-full">
            <BottomGraph />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;