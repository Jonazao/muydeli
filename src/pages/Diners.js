import React from 'react';
import { useNavigate } from 'react-router-dom';

import { NAVIGATION_DINERS_URL } from '../config/configureRoutes';
import DinerCard from '../components/DinerCard';

import { useGetDinersQuery } from '../services/diners';

export default function Diners() {
  const navigate = useNavigate();
  const getDinersResponse = useGetDinersQuery();
  const { isLoading, data } = getDinersResponse;

  const onCardClick = (id) => {
    navigate(`${NAVIGATION_DINERS_URL}/${id}`);
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div>
      {data.result.map((diner) => {
        return <DinerCard key={diner.id} diner={diner} onCardClick={() => onCardClick(diner.id)} />;
      })}
    </div>
  );
}
