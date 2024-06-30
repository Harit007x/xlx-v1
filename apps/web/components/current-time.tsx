import React, { useState, useEffect } from 'react';

const CurrentTime = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };

    updateTime(); // Initial call to set the time immediately

    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return <div>{time}</div>;
};

export default CurrentTime;