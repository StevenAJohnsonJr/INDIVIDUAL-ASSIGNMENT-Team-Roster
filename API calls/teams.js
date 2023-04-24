import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// FIXME:  GET ALL teams
const getTeams = (uid) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/teams.json?orderBy="uid"&equalTo="${uid}"`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => resolve(Object.values(data)))
        .catch(reject);
});

// FIXME: CREATE Team
const createTeams = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/teams.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(reject);
});

// FIXME: DELETE TEAM
const deleteSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/teams/${firebaseKey}.json`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(reject);
});

// FIXME: UPDATE Team
const updateTeam = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/teams/${payload.firebaseKey}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
});

// TODO: GET A SINGLE TEAM'S MEMBER
const getTeamsMember = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/members.json?orderBy="team_id"&equalTo="${firebaseKey}"`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => resolve(Object.values(data)))
        .catch(reject);
});

const getSingleTeams = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/teams/${firebaseKey}.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => resolve(data)) // will resolve a single object
        .catch(reject);
});


export {
    getTeams,
    createTeams,
    getSingleTeams,
    deleteSingleTeam,
    updateTeam,
    getTeamsMember,
};