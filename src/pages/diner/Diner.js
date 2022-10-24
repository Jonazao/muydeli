import React from 'react';
import { useParams } from 'react-router-dom';

import DinerCard from '../../components/DinerCard';

import { useGetDinerQuery } from '../../services/diners';

export default function Diner() {
  const params = useParams();
  const { dinerId } = params;
  const getDinerResponse = useGetDinerQuery(dinerId);
  const { isLoading, data: diner } = getDinerResponse;
  console.log(getDinerResponse);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return diner ? <DinerCard diner={diner}>Diner</DinerCard> : null;
}
