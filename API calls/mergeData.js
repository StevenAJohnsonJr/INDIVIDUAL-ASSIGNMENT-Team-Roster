import { getTeamMember, deleteSingleTeam, getSingleTeam } from './teams';
import { getSingleMember, deleteMembers } from './members';

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObject) => {
      getSingleTeam(memberObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...memberObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamMember(teamFirebaseKey)])
    .then(([teamObject, teamMemberArray]) => {
      resolve({ ...teamObject, members: teamMemberArray });
    }).catch((error) => reject(error));
});

const deleteTeamMember = (teamId) => new Promise((resolve, reject) => {
  getTeamMember(teamId).then((membersArray) => {
    console.warn(membersArray, 'Teams Members');
    const deleteMemberPromises = membersArray.map((members) => deleteMembers(members.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewMemberDetails, viewTeamDetails, deleteTeamMember };