import React, { useState } from 'react';
import './gen.css';

export default function Generate() {
    const [activity, setActivity] = useState('');
    const [activities, setActivities] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handleGenerateActivity = async () => {
        try {
            let url = "https://www.boredapi.com/api/activity";
            let response = await fetch(url);
            let data = await response.json();
            
            setActivities(prevActivities => [...prevActivities, data]);
            setActivity(data);
        } catch (error) {
            console.error("Error fetching activity: ", error);
        }
    };

    const handleShowDetails = (clickedActivity) => {
        setActivity(clickedActivity === activity ? null : clickedActivity);
    };

    return (
        <div>
            <div className="container">
                <button onClick={handleGenerateActivity}>Generate Activity</button>
                {/* <h4>{currActivity}</h4> */}
                
            </div>
            
            <div className='box'>
            <h3>Start a Collection : </h3>
                <div className='activity'>
                    <button onClick={() => setExpanded(!expanded)}>
                        {expanded ? 'Collapse' : 'Expand'}
                    </button>
                    
                    {expanded && (
                    <div className='expand'>
                        <h3>All generated activities</h3>
                        <ul>
                            <div className='gen'>
                            {activities.map((activityitem, index) => (
                                <li key={index}>  {activityitem.activity}
                                <button onClick={() => handleShowDetails(activityitem)}>
                                Details
                                </button>
                                {activity === activityitem && (
                                    <div>
                                    <p>Type: {activityitem.type}</p>
                                    <p>Participants: {activityitem.participants}</p>
                                    <p>Price: {activityitem.price}</p>
                                    <p>Link: {activityitem.link}</p>
                                    <p>Key: {activityitem.key}</p>
                                    </div>
                                )}
                                </li>
                                
                            ))}
                            
                            </div>
                            <br></br>
                        </ul>
                    </div>
                )}
                </div>
                
            </div>
            
        </div>
    );
}
