import {
  NAVIGATION_HOME_URL,
  NAVIGATION_PLACES_URL,
  NAVIGATION_DISHES_URL,
  NAVIGATION_CRITERIA_URL,
  NAVIGATION_DINERS_URL,
} from '../../config/configureRoutes';

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';

const items = [
  {
    label: 'Home',
    value: 1,
    icon: RestoreIcon,
    url: NAVIGATION_HOME_URL,
  },
  {
    label: 'Places',
    value: 2,
    icon: FavoriteIcon,
    url: NAVIGATION_PLACES_URL,
  },
  {
    label: 'Dishes',
    value: 3,
    icon: ArchiveIcon,
    url: NAVIGATION_DISHES_URL,
  },
  {
    label: 'Criteria',
    value: 4,
    icon: ArchiveIcon,
    url: NAVIGATION_CRITERIA_URL,
  },
  {
    label: 'Diners',
    value: 5,
    icon: ArchiveIcon,
    url: NAVIGATION_DINERS_URL,
  },
];

export default items;
