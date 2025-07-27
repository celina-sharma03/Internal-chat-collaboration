// src/components/Notifications.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSMSEnabled] = useState(false);

  useEffect(() => {
    // Fetch current settings when component mounts
    axios.get('/api/user/notifications')
      .then(res => {
        setEmailEnabled(res.data.emailNotifications);
        setSMSEnabled(res.data.smsAlerts);
      });
  }, []);

  const savePreferences = () => {
    axios.put('http://localhost:5001/api/user/notifications', {
      emailNotifications: emailEnabled,
      smsAlerts: smsEnabled
    }).then(() => {
      alert('Preferences saved successfully!');
    }).catch(err => {
      alert('Something went wrong!');
      console.error(err);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-lg text-gray-500 font-semibold mb-4">Notification Preferences</h2>

      <div className="flex text-gray-500 justify-between items-center mb-4">
        <span>Email Notifications</span>
        <input type="checkbox" checked={emailEnabled} onChange={() => setEmailEnabled(!emailEnabled)} className="w-6 h-6" />
      </div>

      <div className="flex text-gray-500 justify-between items-center mb-6">
        <span>SMS Alerts</span>
        <input type="checkbox" checked={smsEnabled} onChange={() => setSMSEnabled(!smsEnabled)} className="w-6 h-6" />
      </div>

      <button onClick={savePreferences} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
        Save Changes
      </button>
    </div>
  );
};

export default Notifications;
