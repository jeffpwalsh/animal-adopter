// import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Moment from 'react-moment';
// import { deleteComment } from '../../actions/post';

// const CommentItem = ({
//   postId,
//   comment: { _id, text, name, user, date },
//   auth,
//   deleteComment,
// }) => (
//   <div className='post bg-white'>
//     <div>
//       <Link to={`/profile/${user}`}>
//         <img
//           className='round-img'
//           src='https://i.pinimg.com/originals/1a/ac/17/1aac178ecbf4569cb90e7782b047de98.png'
//           alt='dog-avatar'
//         />
//         <h4>{name}</h4>
//       </Link>
//     </div>
//     <div>
//       <p className='my-1'>{text}</p>
//       <p className='post-date'>
//         Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
//       </p>
//       {!auth.loading && user === auth.user._id && (
//         <button
//           onClick={() => deleteComment(postId, _id)}
//           type='button'
//           className='btn btn-danger'
//         >
          
//         </button>
//       )}
//     </div>
//   </div>
// );

// CommentItem.propTypes = {
//   postId: PropTypes.string.isRequired,
//   comment: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
//   deleteComment: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { deleteComment })(CommentItem);
