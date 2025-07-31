import React, {memo} from 'react';
import SectionListerReviews from '../SectionListerReviews';

const ReviewsProfileList = ({
  currentUser,
  targetUserId,
  asLister,
}: {
  currentUser?: boolean;
  targetUserId?: number;
  asLister: boolean;
}) => {
  return <SectionListerReviews {...{asLister, targetUserId}} />;
  // }
};

export default memo(ReviewsProfileList);
