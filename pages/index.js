import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../API calls/teams';
import TeamCard from '../components/TeamCard';

function Home() {
  // TODO: Set a state for teams
  const [teams, setTeams] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: this function makes the API call to get all the teams
  const getAllTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  // TODO: make the call to the API to get all the teams on component render
  useEffect(() => {
    getAllTheTeams();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/book/new" passHref>
        <Button>Add A TEAM</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over teams using TeamsCard component */}
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
        ))}
      </div>
    </div>
  );
}

export default Home;
