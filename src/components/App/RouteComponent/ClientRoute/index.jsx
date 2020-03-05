import React, { memo } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LazyComponent from '@Components/Base/Lazy';

function ClientRoute() {
  /* Main */
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/weather" />}
      />
      <Route
        path="/weather"
        render={() => <LazyComponent componentImport={import('@Components/WeatherClient')} componentChunkName="WeatherChunk" />}
      />
      <Redirect to="/weather" />
    </Switch>
  );
}

export default memo(ClientRoute);
