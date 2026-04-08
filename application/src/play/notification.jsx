import React from 'react';
import './notification.css';

import { get_random_word } from './word_list';
import { update_leaderboard } from '../leaderboard/leaderboard';

export function Notification() {
    const [notifications, set_notifications] = React.useState([]);

    function add_notification(user_name, start_word, end_word) {
        const id = Date.now();
        const notification = ` finished a chain (${start_word} -- ${end_word})`;
        set_notifications(prev => [{ id, user_name, text: notification, fading: false }, ...prev]);

        setTimeout(() => start_fade(id), 4000);
    }

    function start_fade(id) {
        set_notifications(prev => prev.map(n => n.id === id ? { ...n, fading: true } : n));

        setTimeout(() => {
            set_notifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    }
    
    
    React.useEffect(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        socket.onopen = () => {
            console.log('WebSocket connected');
        } 

        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);

            if (msg.type === 'notification') {
                add_notification(msg.user_name, msg.start_word, msg.end_word);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => socket.close();
    }, []);

    return (
        <div className="notifications">    
            <ul>
                {notifications.map(n => (
                    <li key={n.id} className={`popup ${n.fading ? 'fade-out' : ''}`}>
                        <span className="Name">{n.user_name}</span> {n.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}