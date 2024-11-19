const db = require('../config/dj');

const fetchUserSkills = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT selectedSkills FROM User WHERE userID = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length > 0) {
        const skills = result[0].selectedSkills.split(',').map(skill => skill.trim());
        resolve(skills);
      } else {
        resolve([]);
      }
    });
  });
};

const fetchEventSkills = (eventId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT skills FROM Events WHERE eventsID = ?';
    db.query(sql, [eventId], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length > 0) {
        const skills = result[0].skills.split(',').map(skill => skill.trim());
        resolve(skills);
      } else {
        resolve([]);
      }
    });
  });
};

const checkSkillMatch = async (userId, eventId) => {
  try {
    const userSkills = await fetchUserSkills(userId);
    const eventSkills = await fetchEventSkills(eventId);

    console.log('User Skills:', userSkills);
    console.log('Event Skills:', eventSkills);

    const match = userSkills.some(skill => eventSkills.includes(skill));
    if (match) {
      console.log('Match found!');
    } else {
      console.log('No match found.');
    }
    return match;
  } catch (error) {
    console.error('Error checking skill match:', error);
    return false;
  }
};

module.exports = {
  checkSkillMatch,
  fetchUserSkills,
  fetchEventSkills,
};





  
  
  


















