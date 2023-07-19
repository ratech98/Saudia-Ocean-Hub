import {createSelector} from '@reduxjs/toolkit';

export const dashboardData = createSelector(
  [(state) => state.dashboard.dashdata],
  (dashdata) => dashdata,
);

// export const imageData = createSelector([
//   (state) => state.dashboard.stateImage,
//   (stateImage) => stateImage,
// ]);
