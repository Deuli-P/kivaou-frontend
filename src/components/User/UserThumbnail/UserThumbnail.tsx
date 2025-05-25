import React from 'react'
import { UserProps } from '../../../utils/types';
import './userThumbnail.scss';
import { initials } from '../../../utils/utils';

interface UserThumbnailProps {
    user: UserProps;
    size: 's' | 'm' | 'l';
  }

const UserThumbnail: React.FC<UserThumbnailProps> = ({ user, size }) => {
  
  return (
    <div className={`user-circle user-circle-${size}`}>
      {user.photo_path ? (
        <img src={user.photo_path} alt={`Photo de ${user.firstname} ${user.lastname}`} className="user-circle-img"/>
      ) : (
        <span className={`user-circle-initials ${size}`}>{initials(user)}</span>
      )}
    </div>
  )
};

export default UserThumbnail