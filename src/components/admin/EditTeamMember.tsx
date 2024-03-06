// EditTeamMember.tsx
import React, { useState, useEffect } from 'react';
import { database } from '../root/Main'
import { ref, update, onValue } from 'firebase/database';

interface TeamMember {
  name: string;
  imageUrl: string;
  info: string;
  email: string;
  social: { icon: string; link: string }[];
}

interface Props {
  memberId: string;
}

const EditTeamMember: React.FC<Props> = ({ memberId }) => {
  const [member, setMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const memberRef = ref(database, `Team/${memberId}`);
    onValue(memberRef, (snapshot) => {
      setMember(snapshot.val());
    });
  }, [memberId]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (member) {
      const memberRef = ref(database, `Team/${memberId}`);
      update(memberRef, member);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof TeamMember) => {
    setMember({ ...member, [field]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" value={member?.name || ''} onChange={(e) => handleChange(e, 'name')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
      </div>
      {/* Repeat the above div for each field (imageUrl, info, email, etc.) */}
      <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">Update</button>
    </form>
  );
};

export default EditTeamMember;
