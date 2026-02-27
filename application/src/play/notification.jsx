import React from 'react';
import './notification.css';

export function Notification() {
    
    
    
    return (
        <div className="notifications">    
            <ul>
                <li className='popup'><span className="Name">Timmothy</span> finished a chain (tag -- fat)</li>
                <li className='popup'><span className="Name">John</span> finished a chain (bad -- dog)</li>
            </ul>
        </div>
    );
}