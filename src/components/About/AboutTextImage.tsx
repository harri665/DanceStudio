import React from 'react';

const AboutTextImage = () => {
  return (
    // Flex container to center contents vertically and horizontally
    <div className="flex items-center justify-center mb-[25vh]">
      <div className="relative w-full md:w-[75vw]">
        {/* Image Block */}
        <img
          src="https://placehold.co/600x400"
          alt=""
          className="w-[75%] h-auto object-cover rounded"
        />
        {/* Text Box Partially Overlapping, positioned at the bottom */}
        <div className="absolute top-[50%]  mb-8 ml-[25%] p-4 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm max-w-md rounded-lg shadow-lg">
          <h2 className="text-[6vw] sm:text-[3vw] font-bold text-gray-800 mb-4">The Best Dance Classes in Boulder Since 2010!</h2>
          <p className="text-gray-700 text-[2vw] hidden sm:block" >
            Streetside has been in Boulder for more than 10 years. We offer 40+ classes weekly in Hip Hop, Breakin, Jazz, Modern, Ballet, and African. Our classes are fun, and we have classes for all levels…even if you’ve never taken a dance class before. Whatever your ability, age, or reasons for dance, we have the perfect class for you. Come join us today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutTextImage;
