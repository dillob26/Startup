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
        const add_notification_interval = setInterval(() => {
            const word_length = Math.random() < 0.5 ? 3 : 4;
            const user_name = "User_" + Math.floor(Math.random() * 100);
            const start_word = get_random_word(word_length);
            const end_word = get_random_word(word_length);
            add_notification(user_name, start_word, end_word);

            //const random_time = (Math.random() * 10000 + 5000) / 1000; // random time between 5 and 15 seconds
            //update_leaderboard(random_time, word_length);
        }, 20000);

        return () => clearInterval(add_notification_interval);
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