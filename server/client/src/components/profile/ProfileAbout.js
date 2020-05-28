import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    nickname,
    characteristics,
    user: { name },
  },
}) => (
  <div className='profile-about'>
    {bio && (
      <Fragment className="story">
        {/* <h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2> */}
        <h2 className="highlight">{nickname}'s Story</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
    <h2 className="highlight spacer">{nickname}'s Character</h2>
    <div>
      {characteristics.map((trait, index) => (
        <div key={index} className='characteristics'>
        {trait}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
