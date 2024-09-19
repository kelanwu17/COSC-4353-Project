import React from 'react';
import VolunteerItem from './VolunteerItem';
import VolunteerOp from '../Data/VolunteerOp';
function VolunteerPage() {
   return (
    
      <div className="flex flex-col md:flex-row items-center justify-center p-8 mb-20"> {/* Added mb-20 for bottom margin */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VolunteerOp.map(project => (
               <VolunteerItem 
                  key={project.title}
                  imgUrl={project.imgUrl}
                  title={project.title}
                  description={project.description}
                  urgency={project.urgency}
                  skills={project.skills}
                  date={project.date}
                  location={project.location}
               />
            ))}
         </div>
      </div>
   );
}

export default VolunteerPage;