import React from "react";
import { Header, UserInfo, RightCardsContainer, RightMiddleCards, BottomGraph } from "../components";

function Profile() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Header />
      <div className="flex flex-col md:flex-row px-4 sm:px-6 py-4 sm:py-6 gap-4 sm:gap-6 w-full">
    
            <div className="flex justify-center rounded-2xl items-start min-h-screen bg-[#0f172a]">
              <UserInfo />
            </div>
            <div className="w-full md:w-3/4 flex flex-col gap-6 min-w-0">
              <div className="w-full transform hover:scale-[1.01] transition-transform duration-300">
                <RightCardsContainer />
              </div>
              <div className="w-full transform hover:scale-[1.01] transition-transform duration-300">
                <RightMiddleCards />
              </div>
              <div className="w-full transform hover:scale-[1.01] transition-transform duration-300">
                <BottomGraph />
              </div>
            </div>
          </div>
        </div>
      );
}

export default Profile;