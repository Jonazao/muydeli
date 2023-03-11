import React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const customIcons = [
  {
    value: 1,
    color: 'error',
    icon: SentimentVeryDissatisfiedIcon,
    label: 'Very Dissatisfied',
  },
  {
    value: 2,
    color: 'error',
    icon: SentimentDissatisfiedIcon,
    label: 'Dissatisfied',
  },
  {
    value: 3,
    color: 'warning',
    icon: SentimentSatisfiedIcon,
    label: 'Neutral',
  },
  {
    value: 4,
    color: 'success',
    icon: SentimentSatisfiedAltIcon,
    label: 'Satisfied',
  },
  {
    value: 5,
    color: 'success',
    icon: SentimentVerySatisfiedIcon,
    label: 'Very Satisfied',
  },
];

function SentimentalRating({ id, rating, onRateChange }) {
  const theme = useTheme();
  return (
    <Grid container justifyContent="space-around">
      {customIcons.map((option) => {
        const { value, color, label, icon: Icon } = option;
        return (
          <IconButton
            id={id}
            key={value}
            item
            aria-label={label}
            component={Grid}
            onClick={() => onRateChange(value)}
            disableRipple={true}
          >
            <Icon
              color={value === rating ? color : ''}
              sx={{
                fontSize: 48,
                transition: theme.transitions.create(['color', 'transform'], {
                  duration: theme.transitions.duration.standard,
                }),
                '&:hover': {
                  color: theme.palette[color].main,
                  transform: 'scale(1.3)',
                },
              }}
            />
          </IconButton>
        );
      })}
    </Grid>
  );
}

export default SentimentalRating;
