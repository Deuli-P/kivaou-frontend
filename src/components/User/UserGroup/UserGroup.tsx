import React from 'react';
import { UserProps } from '../../../utils/types';
import UserThumbnail from '../UserThumbnail/UserThumbnail';
import './userGroup.scss';
interface UserGroupProps {
  users: UserProps[];
  size?: 's' | 'm' | 'l';
}

const UserGroup: React.FC<UserGroupProps> = ({ users, size = 'm' }) => {
  const visibleUsers = users.slice(0, 4);
  const remaining = users.length - visibleUsers.length;

  return (
    <div className={`user_circle-group ${size}`}>
      {visibleUsers.map((user, index) => (
        <div
          key={user.id}
          className={`user_circle-wrapper ${index === 0 ? 'first' : ''} ${size}`}
        >
          <UserThumbnail user={user} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div className="user_circle-wrapper" style={{ marginLeft: -8 }}>
          <div className={`user_circle user_circle--${size} user_circle--extra`}>
            +{remaining}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGroup;