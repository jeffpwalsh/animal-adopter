import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  nickname: '',

  age: '',
  location: '',
  status: '',
  characteristics: '',
  bio: '',
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.characteristics))
        profileData.characteristics = profileData.characteristics.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    nickname,

    age,
    location,
    status,
    characteristics,

    bio,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <section className='profileEdit'>
      <div className='dark-overlay-profileEdit'>
        <div className='profileEdit-inner'>
          <h1>Edit Profile</h1>
          <p>Add some changes to your animal's profile</p>
          <small>* = required field</small>
          <form className='form' onSubmit={onSubmit}>
            <div className='form-group'>
              <select name='status' value={status} onChange={onChange}>
                <option>* Select Animal Status</option>
                <option value='Looking for home currently'>
                  Looking for home currentlye
                </option>
                <option value='Application pending currently'>
                  Application pending currently
                </option>
                <option value='Emergency adoption needed'>
                  Emergency adoption needed
                </option>
              </select>
              <small>Choose animal status</small>
            </div>

            <div className='form-group'>
              <input
                type='text'
                placeholder='Animal nickname'
                name='nickname'
                value={nickname}
                onChange={onChange}
              />
              <small></small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Animal age'
                name='age'
                value={age}
                onChange={onChange}
              />
              <small></small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Area / Location'
                name='location'
                value={location}
                onChange={onChange}
              />
              <small>Eg: CapeTown, WC</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Characteristics'
                name='characteristics'
                value={characteristics}
                onChange={onChange}
              />
              <small>
                Please use comma separated values (eg.
                happy,anxios,playful,nervous)
              </small>
            </div>

            <div className='form-group'>
              <textarea
                rows='4'
                cols='50'
                placeholder='A short bio about your Animal'
                name='bio'
                value={bio}
                onChange={onChange}
              />
              <small>Tell us a little bit about your animal</small>
            </div>

            <input type='submit' className='btn btn-outline-danger' />
            <Link className='btn btn-danger' to='/dashboard'>
              Go Back
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
