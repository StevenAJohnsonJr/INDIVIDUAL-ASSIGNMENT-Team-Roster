import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TeamForm from '../../../components/forms/TeamsForm';
import { getSingleTeams } from '../../../api/teams';

export default function EditTeam() {
  const [editAuth, setEditAuth] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeams(firebaseKey).then(setEditAuth);
  }, [firebaseKey]);
  return (<TeamForm obj={editAuth} />);
}
