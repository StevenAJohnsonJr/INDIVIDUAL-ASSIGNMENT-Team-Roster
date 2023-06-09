import React, { useEffect, useState } from 'react';
import MemberCard from '../../components/MembersCard';
import { useAuth } from '../../utils/context/authContext';
import { getMembers } from '../../api/members';

export default function Members() {
  // TODO: Set a state for books
  const [members, setMembers] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheMembers();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {/* TODO: map over authors here using AuthorCard component */}
      {members.map((member) => (
        <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
      ))}
    </div>
  );
}
