import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthServer } from './config/configureTemplate';
import ProtectedRoute from './hocs/ProtectedRoute';

import TopBarApp from './components/layout/TopBarApp';
import BottomBarApp from './components/layout/BottomBarApp';
import Home from './pages/Home';
import Places from './pages/Places';
import Dishes from './pages/Dishes';
import Criteria from './pages/Criteria';
import Diners from './pages/Diners';
import Login from './pages/Login';
import PostExample from './pages/PostExample';
import PageNotFound from './pages/PageNotFound';
import {
  HOME_URL,
  LOGIN_URL,
  RTKQ_EXAMPLE_URL,
  NAVIGATION_HOME_URL,
  NAVIGATION_PLACES_URL,
  NAVIGATION_DISHES_URL,
  NAVIGATION_CRITERIA_URL,
  NAVIGATION_DINERS_URL,
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
                <Route path={NAVIGATION_HOME_URL} element={<Home />} />
                <Route path={NAVIGATION_PLACES_URL} element={<Places />} />
                <Route path={NAVIGATION_DISHES_URL} element={<Dishes />} />
                <Route path={NAVIGATION_CRITERIA_URL} element={<Criteria />} />
                <Route path={NAVIGATION_DINERS_URL} element={<Diners />} />
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
