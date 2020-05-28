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
    <Fragment>
      <h1 className='large text-primary'>Add Contact Info</h1>
      <p className='lead'>
       Add any details for potential
        adopters to get in touch
      </p>
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
          <small className='form-text'>
            Cell no:
         </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Lister Name'
            name='lister'
            value={lister}
            onChange={onChange}
          />
          <small className='form-text'>
            This can be the same as your registered profile name
         </small>
        </div>
        <div className='form-group'>
          <h4>Date Listed</h4>
          <input type='date' name='from' value={from} onChange={onChange} />
          <small className='form-text'>
            When is your animal avaialble for adoption from
         </small>
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
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddInfo.propTypes = {
  addInfo: PropTypes.func.isRequired,
};

export default connect(null, { addInfo })(AddInfo);
