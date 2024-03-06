import React from 'react';
// Import the video file
import Sequence01 from './Assets/Sequence 01.mp4';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const MainLanding = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse md:items-stretch w-full px-[1.5vw]">
      {/* Hero Text Container */}
      <div className="relative  w-full md:w-[30%] h-auto md:h-[45vw] bg-[#111111] rounded-t-lg md:rounded-t-none md:rounded-r-lg p-[4vw] md:p-[2.5vw] flex flex-col justify-center">
        <h1 className="text-white uppercase bg-transparent text-[6vw] md:text-[3vw] leading-tight md:leading-[4.5vw] font-semibold">
          Learn to Dance Professionally
        </h1>
        <p className="text-white mt-[4vw] md:mt-[2vw] mb-[4vw] md:mb-[4vw] text-[4vw] md:text-[1.2vw] leading-normal md:leading-[1.85vw] font-medium">
          Many
        </p>
        <a
          href=""
          className="w-[75%] mx-auto bg-blue-500 text-white text-center rounded px-[8vw] md:px-[3vw] py-[2vw] md:py-[1.5vw] font-bold text-[4vw] md:text-[1.2vw] leading-[5vw] md:leading-[2vw] hover:bg-white hover:text-black transition-colors"
        >
          GET STARTED
        </a>

        <div className="flex justify-between items-baseline mt-[4vw] md:mt-[8vw]">
          {/* Logo examples */}
          <a href="#">
            <FaInstagram
              style={{ height: '3vw', width: '3vw', minHeight: '1.5vw', minWidth: '1.5vw' }}
              className="md:h-[1.5vw] md:w-[1.5vw]"
            />
          </a>
          {/* Add other logos similarly */}
        </div>
      </div>
      {/* Background Video */}
      <div className="w-full md:w-[70%] h-[50vw] md:h-[45vw] overflow-hidden rounded-b-lg md:rounded-b-none md:rounded-l-lg">
        <video autoPlay loop muted playsInline controls className="w-full h-full object-cover">
          <source src={'src/Assets/Sequence 01.mp4'} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default MainLanding;
