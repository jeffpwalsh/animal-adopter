import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    nickname,
    location,
    age,
    social,
    user: { name },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img
        className='round-img my-1'
        src='https://i.pinimg.com/originals/1a/ac/17/1aac178ecbf4569cb90e7782b047de98.png'
        alt='dog-avatar'
      />
      <h1 className='large'>{nickname}</h1>
      <p className='lead'>
        {status} {name && <span> by {name}</span>}
      </p>
      <p>{age && <span>{age} years old</span>}</p>
      <p>{location && <span>{location}</span>}</p>
   
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
