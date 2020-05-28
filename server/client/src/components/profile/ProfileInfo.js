import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileInfo = ({
  Info: { contact, lister, from, notes },
}) => (
  <div className="profile-info">
    <h3 className='text-dark'>{}CONTACT NOTE</h3>
    <p>Date listed from: {' '}
      <Moment format='YYYY/MM/DD'>{moment.utc(from)}</Moment> {' '}
      {/* {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{moment.utc(to)}</Moment>} */}
    </p>
    <p>
      <strong>Contact: </strong> {contact}
    </p>
    <p>
      <strong>Lister: </strong> {lister}
    </p>
    <p>
      <strong>Notes: </strong> {notes}
    </p>
  </div>
);

ProfileInfo.propTypes = {
  Info: PropTypes.object.isRequired,
};

export default ProfileInfo;
