import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleMember } from '../../../api/members';
import MemberForm from '../../../components/forms/MembersForm';

export default function EditTeam() {
  const [editAuth, setEditAuth] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditAuth);
  }, [firebaseKey]);
  return (<MemberForm obj={editAuth} />);
}
