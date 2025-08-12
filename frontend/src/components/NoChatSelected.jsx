import React from "react";
import chibi_hi from "../assets/chibi_hi.png"; // Update path based on your folder structure

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-md w-full flex flex-col items-center justify-center text-center p-10 bg-white rounded-xl shadow-md border border-gray-100">
        
        {/* Image Display */}
        <img
          src={chibi_hi}
          alt="Welcome"
          className="w-60 h-60 object-contain"
        />

        {/* Welcome Text */}
        
        <div className="w-full bg-blue-100 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome to SyncSpace
          </h2>
          <p className="text-base text-gray-600">
            Select a conversation from the sidebar to start chatting.
            <br />
            Enjoy seamless and secure communication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
