const skillsList = [
    "Communication",
    "Teamwork",
    "Leadership",
    "Problem-Solving",
    "Time Management",
    "Adaptability",
    "Organizational Skills",
    "Empathy",
    "Fundraising",
    "Event Planning",
    "Public Speaking",
    "Project Management",
    "Mentoring",
    "Crisis Management",
    "Technical Support",
    "Customer Service",
    "Grant Writing",
    "Advocacy",
  ];
  
  let userSelectedSkills = [];
  let eventSelectedSkills = [];
  
  // check if skills match between users and events
  const checkSkillMatch = () => {
    const match = userSelectedSkills.some(skill => eventSelectedSkills.includes(skill));
    if (match) {
      
    }
    return match;
  };
  
  const storeUserSkills = (skills) => {
    userSelectedSkills = skills;
  };
  
  const storeEventSkills = (skills) => {
    eventSelectedSkills = skills;
  };
  
  module.exports = { 
    checkSkillMatch, 
    storeUserSkills, 
    storeEventSkills 
  };
  
  
  


















