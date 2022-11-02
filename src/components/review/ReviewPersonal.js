import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import { Avatar } from '@mui/material';
import stringToAvatar from '../../helpers/string-to-avatar';
export default function ReviewPersonal({reviewDate,reviewer}) {
  return (
    <>
     <CardHeader
        avatar={
          <Avatar {...stringToAvatar(`${reviewer.firstName} ${reviewer.lastName}`)}/>
        }
        action={new Date((reviewDate)).toDateString()}
        title={`${reviewer.firstName} ${reviewer.lastName}` }
      />
    </>
  );
}
