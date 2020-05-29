import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileInfo = ({ Info: { contact, lister, from, notes } }) => (
  <div className='profile-info'>
    <h2 className='highlight'>{}CONTACT INFO</h2>
    <p>
      Date listed from: <Moment format='YYYY/MM/DD'>{moment.utc(from)}</Moment>{' '}
    </p>
    <p>
      Contact: <span>{contact}</span>
    </p>
    <p>
      Name: <span>{lister}</span>
    </p>
    <p>
      Notes: <span>{notes}</span>
    </p>
  </div>
);

ProfileInfo.propTypes = {
  Info: PropTypes.object.isRequired,
};

export default ProfileInfo;
