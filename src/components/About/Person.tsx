import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { getDatabase, ref, get } from 'firebase/database';
import { database } from '../root/Main';

// Assuming TypeScript, define an interface for team member
interface TeamMember {
  name: string;
  imageUrl: string;
  info: string;
  email: string;
  social: { icon: string; link: string }[];
}

const TeamCards = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const classesRef = ref(database, 'Team');

    get(classesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const teamMembersArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setTeamMembers(teamMembersArray);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getSocialIcon = (iconName: string): React.ReactElement | null => {
    switch (iconName) {
      case 'facebook':
        return <FaFacebook />;
      case 'instagram':
        return <FaInstagram />;
      case 'twitter':
        return <FaTwitter />;
      default:
        return null;
    }
  };

  // Existing calculateGridColumns function and return statement...
  // Function to calculate grid columns based on team size
  const calculateGridColumns = () => {
    if (teamMembers.length <= 3) {
      return `sm:grid-cols-${teamMembers.length}`;
    }
    return 'sm:grid-cols-3';
  };


  return (
    <div className="mt-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-3xl font-semibold mb-2">Our Team</h1>
        <p className="text-center mb-12">Something about our team</p>
        <div className={`grid ${calculateGridColumns()} gap-4 grid-cols-1`}>
          {teamMembers.map((member, index) => (
            <div key={index} className="p-4 bg-white rounded-lg relative transition-transform duration-1000 hover:-translate-y-7 shadow-lg hover:shadow-xl w-full mt-[10vh]">
              <div className="absolute -top-20 left-0 right-0 flex justify-center">
                <img className="w-36 h-36 rounded-full border border-gray-400 shadow-lg" src={member.imageUrl} alt="Member" />
              </div>
              <div className="pt-20">
                <h2 className="text-center text-2xl">{member.name}</h2>
                <p className="text-center mt-4 px-6">{member.info}</p>
                <p className="text-center mt-4">
                  <a href={`mailto:${member.email}`} className="text-blue-600 hover:text-yellow-500 transition-colors duration-300">{member.email}</a>
                </p>
                <div className="flex justify-center mt-4">
                  <ul className="flex items-center">
                    {member.social.map((social, sIndex) => (
                      <li key={sIndex} className="mx-2 bg-gray-200 rounded-full p-2 text-xl">
                        <a href={social.link} className="hover:text-yellow-500 transition-colors duration-300">
                          {getSocialIcon(social.icon)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCards;
