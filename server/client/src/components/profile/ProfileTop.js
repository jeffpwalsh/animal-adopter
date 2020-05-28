import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    nickname,
    location,
    age,
    user: { name },
  },
}) => {
  return (
    <div className='profile-top'>
      <img
        className='round-img my-1'
        src='https://i.pinimg.com/originals/1a/ac/17/1aac178ecbf4569cb90e7782b047de98.png'
        alt='dog-avatar'
      />
      <h1>{nickname}</h1>
      <p>{status}</p>
      <p>{age} years old</p>
      <p>{location}</p>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
