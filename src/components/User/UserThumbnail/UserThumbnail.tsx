import React from 'react'
import { UserProps } from '../../../utils/types';
import './userThumbnail.scss';

interface UserThumbnailProps {
    user: UserProps;
    size: 's' | 'm' | 'l';
  }

const UserThumbnail: React.FC<UserThumbnailProps> = ({ user, size }) => {
    const initials = `${user.firstname?.[0] ?? ''}${user.lastname?.[0] ?? ''}`.toUpperCase();
  
  return (
    <div className={`user-circle user-circle-${size}`}>
      {user.photo_path ? (
        <img src={user.photo_path} alt={`Photo de ${user.firstname} ${user.lastname}`} className="user-circle-img" loading="lazy"/>
      ) : (
        <span className="user-circle-initials">{initials}</span>
      )}
    </div>
  )
};

export default UserThumbnail