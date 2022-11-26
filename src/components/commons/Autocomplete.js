import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MuiAutocomplete from '@mui/material/Autocomplete';

import Loader from '../commons/Loader';

import useInfiniteLoading from '../../hooks/useInfiniteLoading';

const ListBox = forwardRef(function ListBoxBase(props, ref) {
  const { children, ...rest } = props;

  const innerRef = useRef(null);

  useImperativeHandle(ref, () => innerRef.current);

  return (
    // eslint-disable-next-line
    <ul {...rest} ref={innerRef} role="list-box">
      {children}
    </ul>
  );
});

export default function LazyAutocomplete({ lazyFetchFunction, fetchFunctionParams, setSelectedOption }) {
  const [getItem, getItemsResponse] = lazyFetchFunction();
  const { isLoading: isGetItemsLoading } = getItemsResponse;
  const { items, hasNext, loadNext } = useInfiniteLoading({
    fetchItems: (params) => getItem({ ...fetchFunctionParams, params }),
  });

  const loadMoreResults = () => {
    if (hasNext) {
      loadNext();
    }
  };

  const handleScroll = (event) => {
    const listboxNode = event.currentTarget;

    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    if (listboxNode.scrollHeight - position <= 1) {
      loadMoreResults();
    }
  };

  if (isGetItemsLoading) {
    return <Loader />;
  }

  const handleOnChange = (e, value) => {
    setSelectedOption(value);
  };

  return (
    <MuiAutocomplete
      options={items}
      onChange={handleOnChange}
      ListboxComponent={ListBox}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.name} - ({option.address.addressLine})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a place"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
      ListboxProps={{
        onScroll: handleScroll,
      }}
    />
  );
}
