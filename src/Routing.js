import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthServer } from './config/configureTemplate';
import ProtectedRoute from './hocs/ProtectedRoute';

import TopBarApp from './components/layout/TopBarApp';
import BottomBarApp from './components/layout/BottomBarApp';
import Home from './pages/Home';
import Login from './pages/Login';
import PostExample from './pages/PostExample';
import PageNotFound from './pages/PageNotFound';
import {
  HOME_URL,
  LOGIN_URL,
  RTKQ_EXAMPLE_URL,
  NAVIGATION_ITEM_ONE_URL,
  NAVIGATION_ITEM_TWO_URL,
  NAVIGATION_ITEM_THREE_URL,
  NAVIGATION_ITEM_FOUR_URL,
  NAVIGATION_ITEM_FIVE_URL,
} from './config/configureRoutes';

export default function Routing() {
  return (
    <>
      <Routes>
        {useAuthServer ? <Route path={LOGIN_URL} element={<Login />} /> : null}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <TopBarApp />
              <Routes>
                <Route path={HOME_URL} element={<Home />} />
                <Route path={RTKQ_EXAMPLE_URL} element={<PostExample />} />
                <Route path={NAVIGATION_ITEM_ONE_URL} element={<Home />} />
                <Route path={NAVIGATION_ITEM_TWO_URL} element={<Home />} />
                <Route path={NAVIGATION_ITEM_THREE_URL} element={<Home />} />
                <Route path={NAVIGATION_ITEM_FOUR_URL} element={<Home />} />
                <Route path={NAVIGATION_ITEM_FIVE_URL} element={<Home />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <BottomBarApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
