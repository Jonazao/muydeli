import React, { useState, useRef, useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MuiAutocomplete from '@mui/material/Autocomplete';

import useDebounce from '../../hooks/useDebounce';
import { isNil } from '../../validations/is-nil';

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

export default function Autocomplete({ items, selectedOption, setSelectedOption, getLabelOption }) {
  const [searchText, setSearchText] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);
  const debouncedSearchText = useDebounce(searchText, 150);

  useEffect(() => {
    if (!isNil(searchText)) {
      const newItems = items.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredItems(newItems);
    }
    // eslint-disable-next-line
  }, [debouncedSearchText]);

  const handleOnChange = useCallback(
    (e, value) => {
      setSelectedOption(value);
    },
    [setSelectedOption],
  );

  const handleInputChange = useCallback(
    (e, newValue) => {
      setSearchText(newValue);
    },
    [setSearchText],
  );

  const handleGetOptionLabel = useCallback((option) => option.name, []);

  const handleRenderOption = useCallback(
    (props, option) => (
      <Box component="li" {...props}>
        {getLabelOption(option)}
      </Box>
    ),
    [getLabelOption],
  );

  const handleIsOptionEqualToValue = useCallback(
    (option, value) => value.id === selectedOption.id,
    [selectedOption],
  );

  const handleRenderInput = useCallback(
    (params) => (
      <TextField
        {...params}
        label="Choose a place"
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password', // disable autocomplete and autofill
        }}
      />
    ),
    [],
  );

  const handleFilterOption = useCallback((x) => x, []);

  return (
    <MuiAutocomplete
      value={selectedOption}
      options={filteredItems}
      onChange={handleOnChange}
      onInputChange={handleInputChange}
      ListboxComponent={ListBox}
      autoHighlight
      getOptionLabel={handleGetOptionLabel}
      renderOption={handleRenderOption}
      isOptionEqualToValue={handleIsOptionEqualToValue}
      renderInput={handleRenderInput}
      filterOptions={handleFilterOption}
    />
  );
}
