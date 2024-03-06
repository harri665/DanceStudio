import React, { useEffect, useState } from 'react';
import ImageCard from '../Landing/ImageCard';
import { getDatabase, ref, get, remove, push, update } from 'firebase/database';
import db from '../root/Main';
import { database } from '../root/Main';

import { auth } from '../root/Main';
import Modal from '../shared/Modal';
import firebase from 'firebase/app';
import 'firebase/database';
import EditTeamMember from './EditTeamMember';
// Add the Modal component here if it's defined in the same file
// Otherwise, import it

// Define an interface for the event object
interface Event {
  id: string;
  src: string;
  alt: string;
  title: string;
  quickDesc: string;
  longDesc: string;
  date: string;
  location: string;
  lang: number;
  lat: number;
  cost: string;
  image: string;
  difficulty: string;
}

const UpcomingAdmin: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null); // Assuming 'Event' is your event type

  useEffect(() => {
    const classesRef = ref(database, 'Classes');

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

  const toggleModal = () => setIsModalOpen(!isModalOpen); // Function to toggle modal visibility

  // Import Firebase database

  // Define a type for the event data
  type EventData = {
    title: string;
    quickDesc: string;
    longDesc: string;
    difficulty: string;
    date: string;
    lang: string;
    lat: string;
    cost: string;
    image: string;
    alt: string;
  };
  const user = auth.currentUser;

  const submitEvent = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      console.error('No file selected.');
      return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // This is the base64 string
      const base64String = reader.result as string;

      // Create an event data object including the base64String
      const eventData: EventData = {
        title: (document.getElementsByName('Title')[0] as HTMLInputElement).value,
        quickDesc: (document.getElementsByName('quickDesc')[0] as HTMLInputElement).value,
        longDesc: (document.getElementsByName('longDesc')[0] as HTMLInputElement).value,
        difficulty: (document.getElementsByName('difficulty')[0] as HTMLInputElement).value,
        date: (document.getElementsByName('date')[0] as HTMLInputElement).value, // Ensure this matches your input's name attribute for the date
        cost: (document.getElementById('price') as HTMLInputElement).value,
        lang: (document.getElementById('lang') as HTMLInputElement).value,
        lat: (document.getElementById('lat') as HTMLInputElement).value,
        image: base64String,
        alt: '',
      };

      // Check if user is authenticated
      if (!user) {
        console.error('User must be logged in to add items.');
        return;
      }

      // Specify the path to your array in the database
      const itemsRef = ref(database, 'Classes/');

      // Push a new item to the array
      push(itemsRef, eventData)
        .then(() => console.log('Item added successfully!'))
        .catch((error) => console.error('Error adding item: ', error));
    };

    // Read the file as a Data URL (base64 string)
    reader.readAsDataURL(file);
  };

  // Delete event function
  const deleteEvent = (eventId: string) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this event?')) {
      const eventRef = ref(database, `Classes/${eventId}`);
      remove(eventRef)
        .then(() => {
          console.log('Event deleted successfully!');
          // Optionally, refresh the events list after deletion
          setEvents(events.filter((event) => event.id !== eventId));
        })
        .catch((error) => console.error('Error deleting event: ', error));
    }
  };
  const updateEvent = () => {
    if (!currentEvent) return;

    const updatedEventData = {
      // Collect the data from your form, e.g.,
      title: document.getElementsByName('title')[0].value,
      quickDesc: document.getElementsByName('quickDesc')[0].value,
      longDesc: document.getElementsByName('longDesc')[0].value,
      difficulty: document.getElementsByName('difficulty')[0].value,
      locationName: document.getElementsByName('location')[0].value,
      lang: document.getElementsByName('lang')[0].value,
      lat: document.getElementsByName('lat')[0].value,
      cost: document.getElementsByName('cost')[0].value,
      date: document.getElementsByName('date')[0].value,
      // Include other properties as necessary
    };

    const eventRef = ref(database, `Classes/${currentEvent.id}`);
    update(eventRef, updatedEventData)
      .then(() => {
        console.log('Event updated successfully!');
        setIsEditModalOpen(false);
        // Optionally, refresh the events list or update the state directly
      })
      .catch((error) => console.error('Error updating event: ', error));
  };

  return (
    <>
      <div className="text-[2vw] ml-5 font-bold">Upcoming Events: </div>
      <div className="flex flex-wrap justify-center items-center">
        {events.map((event) => {
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          return (
            <div className="align-center bg-black bg-opacity-50 m-5 rounded-xl shadow-xl">
              <ImageCard
                src={event.image}
                alt={event.alt}
                title={event.title}
                quickDesc={event.quickDesc}
                longDesc={event.longDesc}
                date={formattedDate}
                cost={'$' + event.cost}
                locationName={event.location}
                lang={event.lang}
                lat={event.lat}
              />
              <button
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteEvent(event.id)}
              >
                Delete
              </button>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                onClick={() => {
                  setCurrentEvent(event);
                  setIsEditModalOpen(true);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
        <button className="pointer-events-auto z-10" onClick={toggleModal}>
          <div className="pointer-events-none">
            <ImageCard key={''} src="" alt="add" title="add" quickDesc="add a new" longDesc="" date="" cost="" locationName='' lang={0} lat={0} />
          </div>
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        {/* Content inside the modal goes here */}
        <p className="font-black">Add event</p>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="Title"
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="AMAZING DANCE CLASS"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Quick Description</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="quickDesc"
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="add a description short simple and sweet"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Long Description</label>
          <div className="relative mt-2 rounded-md shadow-2xl">
            <input
              type="text"
              name="longDesc"
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="long description of class"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Difficulty</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="difficulty"
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="EXTRA DIFFICULT"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">Date</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="datetime-local"
              name="date"
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
            />
          </div>
        </div>
        <div>
          <label htmlFor="lang" className="block text-sm font-medium leading-6 text-gray-900">
            Location
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="location"
              id="location"
              className="block w-full rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Denver"
            />
          </div>
        </div>
        <div>
          <label htmlFor="lang" className="block text-sm font-medium leading-6 text-gray-900">
            Lang
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="number"
              name="lang"
              id="lang"
              className="block w-full rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label htmlFor="lang" className="block text-sm font-medium leading-6 text-gray-900">
            Lat
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="number"
              name="lat"
              id="lat"
              className="block w-full rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            Price
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            Image(10mb MAX)
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="file"
              name="image"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
            />
          </div>
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={submitEvent}
        >
          SUBMIT
        </button>
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} style={{ overflowY: 'auto' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '20px',
            maxHeight: '90vh', // 90% of the viewport height
            overflowY: 'auto', // Enable scrolling for content that exceeds the max height
            margin: 'auto',
            width: 'fit-content',
            background: 'white', // Assuming your modal background is white
            borderRadius: '8px', // Optional: for rounded corners
          }}
        >
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 ">
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={currentEvent?.title}
            className = 'p-4 shadow-2xl'
            placeholder="Event Title"
          />
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            Quick Description
          </label>
          <input
            type="text"
            name="quickDesc"
            defaultValue={currentEvent?.quickDesc}
            className = 'p-4 shadow-2xl'
            placeholder="Quick Description"
          />
          <label htmlFor="longDesc" className="block text-sm font-medium leading-6 text-gray-900">
            Long Description
          </label>
          <div className='h-[100px] w-full shadow-2xl'>
          <textarea
            name="longDesc"
            defaultValue={currentEvent?.longDesc}
            style={{ padding: '10px', fontSize: '16px', height: '100%', width:'100%'}}
            placeholder="Long Description"
          />
          </div>
          <label htmlFor="difficulty" className="block text-sm font-medium leading-6 text-gray-900">
            Difficulty
          </label>
          <input
            type="text"
            name="difficulty"
            defaultValue={currentEvent?.difficulty}
            className = 'p-4 shadow-2xl'
            placeholder="Difficulty"
          />
          <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
            Location Name
          </label>
          <input
            type="text"
            name="location"
            defaultValue={currentEvent?.location}
            className = 'p-4 shadow-2xl'
            placeholder="location"
          />
          <label htmlFor="lang" className="block text-sm font-medium leading-6 text-gray-900">
            Lang of locaiton
          </label>
          <input
            type="number"
            name="lang"
            defaultValue={currentEvent?.lang}
            className = 'p-4 shadow-2xl'
            placeholder="lang"
          />
          <label htmlFor="lat" className="block text-sm font-medium leading-6 text-gray-900">
            Lat of location
          </label>
          <input
            type="number"
            name="lat"
            defaultValue={currentEvent?.lat}
            className = 'p-4 shadow-2xl'
            placeholder="lat"
          />
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            Cost
          </label>
          <input
            type="number"
            name="cost"
            defaultValue={currentEvent?.cost}
            className = 'p-4 shadow-2xl'
            placeholder="Cost"
          />
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            Date and Time
          </label>
          <input
            type="datetime-local"
            name="date"
            defaultValue={currentEvent?.date ? currentEvent.date : ''}
            className = 'p-4 shadow-2xl'
          />
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            Image
          </label>
          <div className='h-[10vh]'>
          <input type="file" name="image" className = 'p-4 shadow-2xl' accept="image/*" />
          </div>
          {/* Add inputs for other event properties */}
          <button
            onClick={updateEvent}
            className='bg-blue-500 text-white font-bolder rounded p-4'
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

const AdminPanel: React.FC = () => {
  return (
    <>
      <UpcomingAdmin />
    </>
  );
};

export default AdminPanel;
