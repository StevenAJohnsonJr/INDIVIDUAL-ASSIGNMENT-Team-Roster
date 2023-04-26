import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MemberCard from '../../../components/MembersCard';
import { viewMemberDetails } from '../../../API calls/mergeData';

// inside component use
export default function ViewMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewMemberDetails(firebaseKey).then(setTeamMembers);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-blue ms-5 details">
        <h5>
          By {teamMembers.team_name}
        </h5>
      </div>
      <div className="d-flex flex-wrap">
        {teamMembers.members?.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={viewMemberDetails} />
        ))}
      </div>
    </div>
  );
}
