import React from "react";

const ReelCard = ({ reel }) => {
   return (
      <div className="w-80 bg-black rounded-lg overflow-hidden shadow-md">
         <video
            src={reel.video}
            controls
            className="w-full h-96 object-cover"
         ></video>
         <div className="p-3 text-white">
            <h4 className="font-semibold">{reel.title}</h4>
            <p className="text-sm text-gray-400">{reel.likes} likes</p>
         </div>
      </div>
   );
};

export default ReelCard;
