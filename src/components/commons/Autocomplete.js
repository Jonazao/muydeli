import React, { useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import Fuse from 'fuse.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MuiAutocomplete from '@mui/material/Autocomplete';

import { isEmpty } from '../../validations/is-empty';
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

function Autocomplete({
  label,
  items,
  searchItemProperties,
  selectedOption,
  setSelectedOption,
  getLabelOption,
  addNew,
  ...rest
}) {
  const { onAdd: onAddNew, element: newElement } = addNew;
  const handleOnChange = useCallback(
    (e, value) => {
      if (isNil(value?.id)) {
        onAddNew();
      }
      setSelectedOption(value);
    },
    [setSelectedOption, onAddNew],
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
    [label],
  );

  const handleFilterOption = useCallback(
    (options, params) => {
      const { inputValue } = params;
      if (!isEmpty(inputValue)) {
        const fuse = new Fuse(options, { includeScore: true, keys: searchItemProperties });
        const newItems = fuse
          .search(inputValue)
          .filter((result) => setScore(result.score) > 0.6)
          .sort((a, b) => setScore(b.score) - setScore(a.score))
          .map((result) => result.item);
        if (newItems.length === 0) {
          newItems.push(newElement);
        }
        return newItems;
      } else {
        return options;
      }
    },
    [searchItemProperties, newElement],
  );

  return (
    <MuiAutocomplete
      value={selectedOption}
      options={items}
      onChange={handleOnChange}
      ListboxComponent={ListBox}
      autoHighlight
      getOptionLabel={handleGetOptionLabel}
      renderOption={handleRenderOption}
      isOptionEqualToValue={handleIsOptionEqualToValue}
      renderInput={handleRenderInput}
      filterOptions={handleFilterOption}
      {...rest}
    />
  );
}

Autocomplete.defaultProps = {
  addNew: {},
};

export default Autocomplete;
