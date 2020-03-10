import React, { memo } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LazyComponent from '@Components/Base/Lazy';

function AdminRoute() {
  /* Main */
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/login" />}
      />
      <Route
        path="/login"
        render={() => <LazyComponent componentImport={import('@Components/SignIn')} componentChunkName="SignInChunk" />}
      />
      <Redirect to="/login" />
    </Switch>
  );
}

export default memo(AdminRoute);
