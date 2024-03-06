import React, { useState } from 'react';
import ManageButton from '../router/Router';
import { SignOutButton } from '../domain/auth/SignOutButton';
interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoggedInErrorProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminModalComp: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="ADMIN fixed inset-0 z-[99] overflow-auto bg-smoke-light flex">
      <div className="relative w-full sm:w-[50%] p-8 bg-white  max-w-md m-auto flex-col flex rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button onClick={onClose} className="text-xl font-semibold">&times;</button>
        </div>
        <div className="mt-4">
          {/* Admin content goes here */}
          <p>You are logged into this website under a Admin account this message along with some buttons across the site is not visible to users if you wish to manage this website click bellow</p>
          <ManageButton/>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Close</button>
        </div>
      </div>
    </div>
  );
};

export const AdminModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      
      <AdminModalComp isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};


const LoggedInErrorComp: React.FC<LoggedInErrorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="ADMIN fixed inset-0 z-[99] overflow-auto bg-smoke-light flex">
      <div className="relative w-full sm:w-[50%] p-8 bg-white  max-w-md m-auto flex-col flex rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">LOGIN ERROR</h2>
          <button onClick={onClose} className="text-xl font-semibold">&times;</button>
        </div>
        <div className="mt-4">
          {/* Admin content goes here */}
          <p>your logged into this website with a non admin account please sign out</p>
          <SignOutButton/>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Close</button>
        </div>
      </div>
    </div>
  );
};

export const LoggedInError: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      
      <LoggedInErrorComp isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};


