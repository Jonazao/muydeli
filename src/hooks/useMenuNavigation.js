import React from 'react';
import { useLocation } from 'react-router-dom';
import menuItems from '../components/layout/navigationConfig';

const useMenuNavigation = () => {
  const location = useLocation();
  const [navigationItem, setNavigationItem] = React.useState(false);
  React.useEffect(() => {
    const pathSegments = location.pathname.split('/').filter((v) => v !== '');
    const selectedItem = menuItems.find((item) => pathSegments.some((path) => item.url.includes(`/${path}`)));
    if (selectedItem) {
      setNavigationItem(selectedItem.value);
    } else {
      setNavigationItem(false);
    }
  }, [navigationItem, location]);

  return React.useMemo(
    () => ({
      navigationItem,
      setNavigationItem,
    }),
    [navigationItem, setNavigationItem],
  );
};

export default useMenuNavigation;
