import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewTeamDetails } from '../../api/mergeData';
import MemberCard from '../../components/MembersCard';

// inside component use
export default function ViewAuthor() {
  const [teamMembers, setTeamMembers] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamMembers);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-blue ms-5 details">
        <h5>
          By: {teamMembers.team_name}
        </h5>
      </div>
      <div className="d-flex flex-wrap">
        {teamMembers.members?.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={viewTeamDetails} />
        ))}
      </div>
    </div>
  );
}
