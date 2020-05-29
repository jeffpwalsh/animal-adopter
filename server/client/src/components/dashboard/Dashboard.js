import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Info from './Info';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <section className='dashboard'>
      <div className='dark-overlay-dashboard'>
        <div className='dashboard-inner'>
          <h1>Dashboard</h1>
          <p>Welcome {user && user.name}</p>
          {profile !== null ? (
            <Fragment>
              <DashboardActions />
              <Info Info={profile.Info} />
              <div className='my-2'>
                <button
                  className='btn btn-warning'
                  onClick={() => deleteAccount()}
                >
                  Delete My Account
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
