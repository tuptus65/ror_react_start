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
    setSource('gravatar');
  }, [user]);

  if (source === 'custom') {
    return <img src={user.avatar} className="rounded-full object-cover" style={{ width: size, height: size }} alt="" />;
  }

  if (source === 'gravatar') {
    const emailHash = md5(user.email.trim().toLowerCase());
    return <img src={`https://www.gravatar.com/avatar/${emailHash}?s=${size * 2}&d=initials&initials=${firstLetter}`} className="rounded-full" style={{ width: size, height: size }} alt="" />;
  }

  return null;
};

export default Avatar;