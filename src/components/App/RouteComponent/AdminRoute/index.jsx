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
        render={() => <Redirect to="/weather" />}
      />
      <Route
        path="/weather"
        render={() => <LazyComponent componentImport={import('@Components/Weather')} componentChunkName="WeatherChunk" />}
      />
      <Route
        path="/adviewer"
        render={() => <LazyComponent componentImport={import('@Components/ADViewer')} componentChunkName="ADViewerChunk" />}
      />
      <Redirect to="/weather" />
    </Switch>
  );
}

export default memo(AdminRoute);
