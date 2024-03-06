// App.tsx or any parent component
import React from 'react';
import ImageCard from './ImageCard';




const Upcoming = () => {
  return (
    <>
      <div className='text-[5vw] ml-5 font-bold'>Upcoming Events: </div>
      <div className=" flex flex-wrap justify-center items-center ">
        <ImageCard
          src="https://images.unsplash.com/photo-1439405326854-014607f694d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="Image 1"
          title="Image Title 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          date="Sept 15"
          cost = "$20"
        />
        <ImageCard
          src="https://www.gohawaii.com/sites/default/files/hero-unit-images/11500_mauibeaches.jpg"
          alt="Image 2"
          title="Image Title 2"
          description="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
          date="Sept 15"
          cost = "$20"
        />
        <ImageCard
          src="https://www.traveloffpath.com/wp-content/uploads/2023/03/Big-Beach-Maui-Hawaii.jpg"
          alt="Image 3"
          title="Image Title 3"
          description="Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante."
          date="Sept 15"
          cost = "$20"
        />
        <ImageCard
          src="https://www.traveloffpath.com/wp-content/uploads/2023/03/Big-Beach-Maui-Hawaii.jpg"
          alt="Image 3"
          title="Image Title 3"
          description="Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante."
          date="Sept 15"
          cost = "$20"
        />

        {/* Add more ImageCard components as needed */}
      </div>
    </>
  );
};

// export default Upcoming;
