import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Adoptees</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Adoption Profiles</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar navbar-expand-lg'>
      <h1>
        <Link to='/' className='navbarHeading'>
          Animal<span className='heart'>&#10084;</span>Adopter
        </Link>
      </h1>

      <button
        className='helpButton btn btn-warning'
        onClick={() =>
          alert(`
1. Login, Sign-Up/Register, and Logout
- Click [sign-up] to create an account. 
- This account is saved to a cloud DATABASE. 
- Click [login-in] to access account.
- Click [logout] to logout of account.

2. Dashboard
- Click [Create] or [Edit] your profile.
- This is an animal profile with the animal's profile details.
- Click [Add Info] to create a contact info note for the animal's profile.
- This can be done multiple times if there is multiple contacts for one animal.
- Click [Delete] info top remove a contact info note created.

3. Adoption Profiles
- Click [Adoption Profiles] to see all animal profiles currently loaded
- This is an unprotected/unauthenticated route and can be seen by anyone.
- Click [View Profile] to access the full profile of the animal.
- If you are viewing the animal profile created by you, you will see an option to edit the profile.

4. DEV NOTES
- Generic image set for each profile as image uploader not yet finalised at release.`)
        }
      >
        Help
      </button>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
