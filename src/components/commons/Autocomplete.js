import React, { useState, useRef, useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';
import Fuse from 'fuse.js';
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

const setScore = (value) => (value < 0.1 ? 1 / value : value);

export default function Autocomplete({
  label,
  items,
  searchItemProperties,
  selectedOption,
  setSelectedOption,
  getLabelOption,
}) {
  const [searchText, setSearchText] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);
  const debouncedSearchText = useDebounce(searchText, 150);

  useEffect(() => {
    if (!isNil(searchText)) {
      const fuse = new Fuse(items, { includeScore: true, keys: searchItemProperties });
      const newItems = fuse
        .search(searchText)
        .filter((result) => setScore(result.score) >= 0.5)
        .sort((a, b) => setScore(b.score) - setScore(a.score))
        .map((result) => result.item);
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

  const handleGetOptionLabel = useCallback((option) => `${option.name}`, []);

  const handleRenderOption = useCallback(
    (props, option) => (
      <Box key={option.id} component="li" {...props}>
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
        label={label}
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
