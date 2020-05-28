import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addInfo } from '../../actions/profile';

const AddInfo = ({ addInfo, history }) => {
  const [formData, setFormData] = useState({
    contact: '',
    lister: '',
    from: '',
    notes: '',
  });

  const { contact, lister, from, notes } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className='infoAdd'>
      <div className='dark-overlay-infoAdd'>
        <div className='infoAdd-inner'>
          <h1>Add Contact Info</h1>
          <p>Add any details for potential adopters to get in touch</p>
          <small>* = required field</small>
          <form
            className='form'
            onSubmit={(e) => {
              e.preventDefault();
              addInfo(formData, history);
            }}
          >
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Contact Number'
                name='contact'
                value={contact}
                onChange={onChange}
                required
              />
              <small>Cell no:</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Lister Name'
                name='lister'
                value={lister}
                onChange={onChange}
              />
              <small>
                This can be the same as your registered profile name
              </small>
            </div>
            <div className='form-group'>
              <input type='date' name='from' value={from} onChange={onChange} />
              <small>When is your animal avaialble for adoption from</small>
            </div>
            <div className='form-group'>
              <textarea
                name='notes'
                cols='30'
                rows='5'
                placeholder='Any notes for anybody wanting to contact you regarding adoption of your animal ?'
                value={notes}
                onChange={onChange}
              />
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

AddInfo.propTypes = {
  addInfo: PropTypes.func.isRequired,
};

export default connect(null, { addInfo })(AddInfo);
