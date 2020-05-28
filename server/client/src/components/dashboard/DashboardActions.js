import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile'>
      <button className='btn btn-danger'> Edit Profile</button>
      </Link>
      <Link to='/add-Info'>
        <button className='btn btn-danger'> Add Info</button>
      </Link>
      <Link to="/profiles"><button className='btn btn-danger'> All Profiles</button></Link>
      {/* <Link to='/add-education' className='btn btn-light'>
       Add Education
      </Link> */}
    </div>
  );
};

export default DashboardActions;
