import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import { Avatar } from '@mui/material';
import stringToAvatar from '../../helpers/string-to-avatar';
export default function ReviewPersonal({ reviewDate, reviewer }) {
  const { firstName, lastName } = reviewer;

  return (
    <>
      <CardHeader
        avatar={<Avatar {...stringToAvatar(`${firstName} ${lastName}`)} />}
        action={new Date(reviewDate).toDateString()}
        title={`${firstName} ${lastName}`}
      />
    </>
  );
}
