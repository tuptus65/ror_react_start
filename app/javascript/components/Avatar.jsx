import React, { useState, useEffect } from 'react';
import md5 from 'blueimp-md5';

const Avatar = ({ user, size = 32 }) => {
  const [source, setSource] = useState('loading');

  const firstLetter = user?.email?.charAt(0).toUpperCase() || '?';

  useEffect(() => {
    if (!user?.email) return;

    if (user.avatar) {
      setSource('custom');
      return;
    }

    const emailHash = md5(user.email.trim().toLowerCase());
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=${size * 2}&d=404`;

    const img = new Image();
    img.src = gravatarUrl;

    img.onload = () => setSource('gravatar'); // Jeśli obrazek istnieje (200 OK)
    img.onerror = () => setSource('letter');  // Jeśli błąd (np. 404) - konsola pozostaje czysta!
  }, [user]);

  const getBackgroundColor = (char) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-600', 'bg-purple-500'];
    return colors[char.charCodeAt(0) % colors.length];
  };

  if (source === 'custom') {
    return <img src={user.avatar} className="rounded-full object-cover" style={{ width: size, height: size }} alt="" />;
  }

  if (source === 'gravatar') {
    const emailHash = md5(user.email.trim().toLowerCase());
    return <img src={`https://www.gravatar.com/avatar/${emailHash}?s=${size * 2}`} className="rounded-full" style={{ width: size, height: size }} alt="" />;
  }

  if (source === 'letter' || source === 'loading') {
    return (
        <div
            style={{ width: size, height: size }}
            className={`flex items-center justify-center rounded-full text-white font-bold text-sm ${getBackgroundColor(firstLetter)}`}
        >
          {firstLetter}
        </div>
    );
  }

  return null;
};

export default Avatar;