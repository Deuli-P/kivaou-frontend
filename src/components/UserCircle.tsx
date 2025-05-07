import React from 'react'
import { UserProps } from '../utils/types';

interface UserCircleProps {
    user: UserProps;
    size: 's' | 'm' | 'l';
  }

const UserCircle: React.FC<UserCircleProps> = ({ user, size }) => {
    const initials = `${user.firstname?.[0] ?? ''}${user.lastname?.[0] ?? ''}`.toUpperCase();
  
  return (
    <div className={`user_circle user_circle--${size}`}>
      {user.photo_path ? (
        <img src={user.photo_path} alt={`${user.firstname} ${user.lastname}`} className="user_circle-img" />
      ) : (
        <span className="user_circle-initials">{initials}</span>
      )}
    </div>
  )
}

export default UserCircle