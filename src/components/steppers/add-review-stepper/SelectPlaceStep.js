import React from 'react';
import SelectPlace from '../../places/SelectPlace';

export default function SelectPlaceStep({ selectedPlace, setSelectedPlace }) {
  return <SelectPlace selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />;
}
