// JsonEditComponent.tsx
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../root/Main';
const JsonEditComponent: React.FC = () => {
  const [editData, setEditData] = useState<string>('');

  useEffect(() => {
    const dataRef = ref(database, 'Team');
    // Fetch the data once on component mount
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      // Convert the data to a formatted JSON string for editing
      const formattedData = JSON.stringify(data, null, 2);
      setEditData(formattedData);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditData(event.target.value);
  };

  const handleSave = () => {
    try {
      const jsonData = JSON.parse(editData);
      console.log(jsonData)
      const dataRef = ref(database, 'Team');
      update(dataRef, jsonData);
      alert('Data saved successfully!');
    } catch (error) {
      alert('Invalid JSON data.');
    }
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded shadow-sm"
        value={editData} // Use editData as the value for the textarea
        onChange={handleChange}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default JsonEditComponent;
