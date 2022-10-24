import React from 'react';

import { useGetDinersQuery } from '../services/diners';

export default function Diners() {
  const getDinersResponse = useGetDinersQuery();
  console.log(getDinersResponse);
  return <div>Diners</div>;
}
