import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MuiAutocomplete from '@mui/material/Autocomplete';

import useInfiniteLoading from '../../hooks/useInfiniteLoading';
import useDebounce from '../../hooks/useDebounce';

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

export default function LazyAutocomplete({
  lazyFetchFunction,
  fetchFunctionParams,
  selectedOption,
  setSelectedOption,
}) {
  const [searchText, setSearchText] = useState(null);
  const debouncedSearchText = useDebounce(searchText, 500);
  const [getItem] = lazyFetchFunction();
  const { items, loadInitialItems, hasNext, loadNext } = useInfiniteLoading({
    fetchItems: (params) =>
      getItem({ ...fetchFunctionParams, params: { ...params, searchText: debouncedSearchText } }),
    fetchOnInit: false,
  });

  useEffect(() => {
    loadInitialItems();
    // eslint-disable-next-line
  }, [debouncedSearchText]);

  const loadMoreResults = () => {
    if (hasNext) {
      loadNext();
    }
  };

  const handleScroll = (event) => {
    const listBoxNode = event.currentTarget;

    const position = listBoxNode.scrollTop + listBoxNode.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      loadMoreResults();
    }
  };

  const handleOnChange = (e, value) => {
    setSelectedOption(value);
  };

  const handleInputChange = (e, newValue) => {
    setSearchText(newValue);
  };

  return (
    <MuiAutocomplete
      value={selectedOption}
      options={items}
      onChange={handleOnChange}
      onInputChange={handleInputChange}
      ListboxComponent={ListBox}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.name} - ({option.address.addressLine})
        </Box>
      )}
      isOptionEqualToValue={(option, value) => option.id === value.id}
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
      filterOptions={(x) => x}
    />
  );
}