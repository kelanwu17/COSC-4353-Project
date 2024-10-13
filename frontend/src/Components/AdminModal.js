import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '400px',
    padding: '20px',
    zIndex: 1000,
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'auto',
    wordBreak: 'break-all',
};

const entireStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
};

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

const urgencyLevels = ["High", "Medium", "Low"];

export default function AdminModal({ open, onClose, title, description, urgency, skills, location, date }) {
    const modalRef = useRef(null);

  

    const [newTitle, changeTitle] = useState(title);
    const [newDesc, changeDesc] = useState(description);
    const [newUrg, changeUrg] = useState(urgency);
    const [newSk, changeSk] = useState(skills);
    const [newLoc, changeLoc] = useState(location);
    const [newDate, changeDate] = useState(date);
    const [cuSkills, setAvailableSkills] = useState(skillsList);

    const handleSkillChange = (skill) => {
    
    if (newSk.includes(skill)) {
        changeSk(prevSkills => prevSkills.filter(sk => sk !== skill).sort());
    } else {
        changeSk(prevSkills => [...prevSkills, skill].sort());
    }
    };

    if (!open) return null;

    return ReactDOM.createPortal(
        <div style={entireStyle}>
            <div style={modalStyle} ref={modalRef}>
                <div className="text-xl font-bold mb-2">Edit Details</div>
                <div className="text-xs">
                    Location:
                    <input type="text" value={newLoc} onChange={(temp) => changeLoc(temp.target.value)} />
                </div>
                <div className="text-xs">
                    Date: 
                    <input type="text" value={newDate} onChange={(temp) => changeDate(temp.target.value)} />
                </div>
                <div>
                    <label className="block text-sm">Title:</label>
                    <textarea className="border border-black border-2" value={newTitle} onChange={(temp) => changeTitle(temp.target.value)} />
                </div>
                <div>
                    <label className="block text-sm">Description:</label>
                    <textarea className='w-full border border-black border-2' style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }} value={newDesc} onChange={(temp) => changeDesc(temp.target.value)} />
                </div>
                <div>
                    <label className="block text-sm">Urgency:</label>
                    <select className="border border-black border-2" value={newUrg} onChange={(temp) => changeUrg(temp.target.value)}>
                        {urgencyLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm">Skills Required:</label>
                    <div className="flex-wrap flex gap-1">
                        {skillsList.sort().map(skill => (
                            <div key={skill} className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    id={skill} 
                                    checked={newSk.includes(skill)} 
                                    onChange={() => handleSkillChange(skill)} 
                                />
                                <label  className="ml-2">{skill}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2">
                        <strong>Selected Skills:</strong>
                        <ul>
                            {newSk.sort().map(skill => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                 <div className="flex justify-end space-x-2 absolute right-2">
                <button className="rounded-md bg-blue-400 text-white border border-black right-0" onClick={(temp) => { temp.stopPropagation(); onClose(); }}>
                    Save
                </button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    );
}