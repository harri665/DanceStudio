import React, { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import { getDatabase, ref, get } from 'firebase/database';
import { database } from '../root/Main';

// Define an interface for the event object
interface Event {
  id: string;
  src: string;
  alt: string;
  title: string;
  quickDesc: string;
  longDesc: string;
  date: string;
  cost: string;
  image: string;
  locationName:string; 
  lang:number; 
  lat:number; 
}

const Upcoming: React.FC = () => {
  // State to store fetched events, typed with the Event interface
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Reference to your Firebase database path
    const classesRef = ref(database, 'Classes');

    // Fetch data from Firebase
    get(classesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const eventsArray: Event[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setEvents(eventsArray);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="text-[5vw] ml-5 font-bold">Upcoming Events: </div>
      <div className="flex flex-wrap justify-center items-center">
        {events.map((event) => {
          const eventDate = new Date(event.date);

          // Format the date as "MMM dd, HH:mm" - e.g., "Feb 01, 20:12"
          const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'short', // Abbreviated month name
            day: 'numeric', // Numeric day
            hour: '2-digit', // 2-digit hour
            minute: '2-digit', // 2-digit minute
            hour12: false // Use 24-hour clock
          });

          return (
            <ImageCard
              key={event.id}
              src={event.image}
              alt={event.alt}
              title={event.title}
              quickDesc={event.quickDesc}
              longDesc={event.longDesc}
              date={formattedDate} // Use the newly formatted date
              cost={"$" + event.cost}
              locationName = {event.locationName}
              lang = {Number(event.lang)}
              lat = {Number(event.lat)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Upcoming;

