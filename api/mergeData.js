import { deleteSingleTeam, getSingleTeams, getTeamsMember } from './teams';
import { getSingleMember, deleteMembers } from './members';

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObject) => {
      getSingleTeams(memberObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...memberObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeams(teamFirebaseKey), getTeamsMember(teamFirebaseKey)])
    .then(([teamObject, teamMemberArray]) => {
      resolve({ ...teamObject, members: teamMemberArray });
    }).catch((error) => reject(error));
});

const deleteTeamMember = (teamId) => new Promise((resolve, reject) => {
  getTeamsMember(teamId).then((membersArray) => {
    console.warn(membersArray, 'Teams Members');
    const deleteMemberPromises = membersArray.map((members) => deleteMembers(members.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewMemberDetails, viewTeamDetails, deleteTeamMember };