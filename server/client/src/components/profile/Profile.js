import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileInfo from './ProfileInfo';
// import ProfileEducation from './ProfileEducation';

import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <div className='profileSingle'>
          <div className='dark-overlay-profileSingle'>
            <div className='inner-profileSingle'>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                  <Link
                    to='/edit-profile'
                    className='btn btn-danger spacer-bottom'
                  >
                    Edit Profile
                  </Link>
                )}
              <div>
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                <div>
                  {profile.Info.length > 0 ? (
                    <Fragment>
                      {profile.Info.map((Info) => (
                        <ProfileInfo key={Info._id} Info={Info} />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No Info </h4>
                  )}
                </div>
                <Link to='/profiles' className='btn btn-danger'>
                  Back To Profiles
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
