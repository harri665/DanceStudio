import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%', // Adjust the width as needed
  height: '100%', // Adjust the height as needed
};

// Your Google Maps API Key
const apiKey = 'AIzaSyBHjMX7st99_HcRJRan0pXPpdXaEWCktbU';

// Position of the Eiffel Tower
const eiffelTowerPosition = {
  lat: 48.8584,
  lng: 2.2945,
};

interface MyMapComponentProps {
  position: { lat: number; lng: number };
}

const MyMapComponent: React.FC<MyMapComponentProps> = ({ position}) => (
  <LoadScript googleMapsApiKey={apiKey}>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13} // Adjust the zoom level as needed
      center={position}
    >
      <Marker position={position} />
    </GoogleMap>
  </LoadScript>
);

interface ClassModalProps {
  click: any;
  src: string;
  alt: string;
  title: string;
  description: string;
  date: string;
  cost: string;
  location: string; 
  lang:number; 
  lat:number;  
}

const ClassModal: React.FC<ClassModalProps> = ({ click, src, alt, title, description, date, cost,location,lang, lat }) => {
  const position = { lat: lat, lng: lang }; // Example position (Eiffel Tower)
  console.log(position)

  return (
    <div
      className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center  items-center md:items-start md:pt-[3vh] "
      style={{ animation: 'fadeIn 0.2s' }}
    >
      <div className="absolute w-full sm:w-auto">
        {/*button*/}
        <button
          className="absolute z-20 right-[2vw] mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition font-black hover:scale-110 outline-[.2em] outline-blue-500 hover:outline-double"
          onClick={click}
        >
          X
        </button>
        {/* Title */}
        <h2 className="bg-white px-4 text-center text-[3vh] rounded-lg sm:w-[20vw] w-[50vw] font-black">{title}</h2>

        {/* Image */}
        <div className="w-[100%]  h-[25vh] md:h-[40vh] m-1 sm:m-1 rounded-lg shadow-lg duration-300 hover:scale-[102%] outline-[.5em] outline-blue-500 hover:outline-double relative">
          <img src={src} alt={alt} className="w-full h-full object-cover transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 bg-opacity-50 bg-black text-white px-5 font-rose text-[3vh] sm:text-[5vh] text-yellow-400 rounded-tr-lg">
            P. Christine
          </div>
        </div>

        <div className="bg-white p-4 rounded-t-lg flex">
          <div className="text-white text-sm sm:text-base shadow-xl px-2 bg-blue-500 rounded font-medium w-[20vw] sm:w-[15vw] text-center">
            {date}
          </div>
          <div className="text-white text-sm sm:text-base shadow-xl px-2 bg-yellow-500 rounded font-medium w-[15vw] text-center">
            {cost}
          </div>
          <div className="text-white text-sm sm:text-base shadow-xl px-2 bg-purple-500 rounded font-medium w-[25vw] text-center">
            intermediate
          </div>
        </div>
        {/* Body */}
        <div className="bg-white p-4 rounded-b-lg">
          <div className='w-full h-[20vh] sm:hidden'>
          <MyMapComponent position={position}/>
          </div>
          
          <div className="flex flex-row md:flex-row w-full mb-5">
            {/* This div will now stack on mobile and be side by side on larger screens */}
            <div className="flex-1 hidden sm:block min-h-[300px] rounded">
              <p className='text-xl font-bold text-center uppercase bg-green-500 rounded '>{location}</p>
              <MyMapComponent position={position}/>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <p>{description}</p>
            </div>
          </div>

          {/* Button */}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded transition font-black hover:scale-105 outline-[.5em] outline-blue-400 duration-300 hover:outline-double"
            onClick={() => {}}
          >
            JOIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassModal;
