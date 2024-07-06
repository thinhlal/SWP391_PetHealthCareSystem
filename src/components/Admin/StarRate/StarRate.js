import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import React from 'react';

const StarRate = ({ rating, totalStars, totalReviews }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const iconSize = { fontSize: '17px' };

  for (let i = 0; i < totalStars; i++) {
    if (i < fullStars) {
      stars.push(
        <StarRateIcon
          key={i}
          style={{ color: '#fbbc0b', ...iconSize }}
        />,
      );
    } else if (i === fullStars && halfStar) {
      stars.push(
        <StarHalfIcon
          key={i}
          style={{ color: '#fbbc0b', ...iconSize }}
        />,
      );
    } else {
      stars.push(
        <StarOutlineIcon
          key={i}
          style={{ color: '#fbbc0b', ...iconSize }}
        />,
      );
    }
  }

  return (
    <div className='Admin-DashBoard-Star'>
      {stars}
      {totalReviews ? <span>({totalReviews})</span> : null}
    </div>
  );
};

export default StarRate;
