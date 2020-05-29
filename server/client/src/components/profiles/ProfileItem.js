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
    <section className='adoptionProfile'>
      <div className='dark-overlay-adoptionProfile'>
        <div className='inner-adoptionProfile'>
          {/* generic image utilised for now */}
          <img
            src='https://i.pinimg.com/originals/1a/ac/17/1aac178ecbf4569cb90e7782b047de98.png'
            alt='dog-avatar'
            className='round-img'
          />
          <div>
            <h2>{nickname}</h2>
            <p>
              Status: <span>{status}</span>
            </p>
            <p>Location: {location && <span>{location}</span>}</p>
            <p>Age: {age}</p>
            <Link to={`/profile/${_id}`} className='btn btn-danger'>
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
