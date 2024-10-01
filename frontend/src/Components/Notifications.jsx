import React from 'react'
import "./Notification.css"
const DropDownNotif = () => {
    return (
        
        <div className="flex flex-col dropDownNotifProfile border-black border">
            <ul className="flex flex-col gap-4">
                <li className="text-sm">Reminder you will be volunteering tommorow at the Local Parks</li>
            </ul>
        </div>
    );
}

export default DropDownNotif;