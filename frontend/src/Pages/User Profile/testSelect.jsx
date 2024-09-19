import React from 'react';

const TestSelect = () => {
  return (
    <div>
      <label htmlFor="testSelect"><strong>Select Skills</strong></label>
      <select id="testSelect" name="skills" multiple size="5">
        <option value="Communication">Communication</option>
        <option value="Teamwork">Teamwork</option>
        <option value="Leadership">Leadership</option>
        <option value="Problem-Solving">Problem-Solving</option>
        <option value="Time Management">Time Management</option>
      </select>
    </div>
  );
};

export default TestSelect;