import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name },
    status,
    nickname,
    location,
    age,
    characteristics,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img
        src='https://i.pinimg.com/originals/1a/ac/17/1aac178ecbf4569cb90e7782b047de98.png'
        alt='dog-avatar'
        className='round-img'
      />
      <div>
        <h2>{nickname}</h2>
        <p>
          Status: {status} {nickname && <span> for {nickname}</span>}
        </p>
        <p>Area: {location && <span>{location}</span>}</p>
        <p>Age: {age}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      {/* <ul>
        {characteristics.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
