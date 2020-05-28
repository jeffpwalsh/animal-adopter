import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteInfo } from '../../actions/profile';

const Info = ({ Info, deleteInfo }) => {
  const Infos = Info.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.lister}</td>
      <td className='hide-sm'>{exp.contact}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{moment.utc(exp.from)}</Moment>
      </td>
      <td>
        <button onClick={() => deleteInfo(exp._id)} className='btn btn-danger'>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Info </h2>
      <p>Click "Add Info" to list contact info below for animal adopters to see in your animal's profile</p>
      <table className='table'>
        <thead>
          <tr>
            <th>Lister</th>
            <th>Contact</th>
            <th>Date Listed</th>
            <th />
          </tr>
        </thead>
        <tbody>{Infos}</tbody>
      </table>
    </Fragment>
  );
};

Info.propTypes = {
  Info: PropTypes.array.isRequired,
  deleteInfo: PropTypes.func.isRequired,
};

export default connect(null, { deleteInfo })(Info);
