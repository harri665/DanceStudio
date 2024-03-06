import React, { useState } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  docId: string; // Document ID to edit
  currentData: { [key: string]: any }; // Current data of the document
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, docId, currentData }) => {
  const [formData, setFormData] = useState(currentData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Data</h3>
          <div className="mt-2 px-7 py-3">
            <form onSubmit={() => {}}>
              {Object.keys(formData).map((key) => (
                <div key={key} className="mb-6"> {/* Increased margin-bottom for better separation */}
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              ))}
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">Save</button>
                <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
