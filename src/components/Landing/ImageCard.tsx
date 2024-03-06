import React, { useState } from 'react';
import ClassModal from '../Class/ClassModal';

interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  quickDesc: string;
  longDesc: string;
  date: string;
  cost: string;
  locationName: string; // Add location property here
  lang:number;
  lat:number; 
}


const ImageCard: React.FC<ImageCardProps> = ({ src, alt, title, quickDesc, longDesc, date, cost, locationName,lang,lat }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div
        className="shadow-[0_35px_60px_-15px_rgba(0,0,0,.5)] hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,2)] relative w-40 sm:w-60 h-56 md:h-[40vh] xl:w-[15vw]  m-2 sm:m-5 overflow-hidden rounded-lg  transition-transform duration-300 hover:scale-105 outline-9 outline-blue-500 hover:outline-double hover:cursor-pointer"
        onClick={toggleModal}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover transition-opacity duration-300" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center transition-bg-opacity duration-300 hover:bg-opacity-50">
          <div className="text-center text-white px-4">
            <div className="absolute top-0 left-0 p-4">
              <div className="text-white text-sm sm:text-base shadow-xl px-2 bg-blue-500 rounded font-medium">
                {date}
              </div>
            </div>
            <div className="absolute top-0 right-0 p-4">
              <div className="text-white text-sm sm:text-base shadow-xl px-2 bg-yellow-500 rounded font-medium">
                {cost}
              </div>
            </div>
            <div className="text-lg sm:text-5xl w-[100%] left-0 top-[15%] font-black">{title}</div>
            <div className="text-sm sm:text-sm mb-2 w-[100%] mt-1 left-0 top-[15%] font-black bg-purple-500 rounded">
              intermediate
            </div>
            
            <div className="absolute bottom-0 left-0 p-4">
              <div className="text-white text-sm sm:text-base shadow-xl px-2 bg-green-500 rounded font-medium">
                {locationName}
              </div>
            </div>
            <div className="px-2 mb-5 sm:opacity-100 opacity-0 absolute text-sm sm:text-base left-0 bottom-[5%] transition-all duration-500">
              {quickDesc}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ClassModal
          click={toggleModal}
          src={src}
          alt={alt}
          title={title}
          description={longDesc}
          date={date}
          cost={cost}
          location={locationName}
          lang={lang}
          lat={lat}
          // You could also pass location to ClassModal if it's supposed to show it
        />
      )}
    </>
  );
};

export default ImageCard;

