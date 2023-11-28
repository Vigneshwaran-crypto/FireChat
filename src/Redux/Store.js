const {configureStore, getDefaultMiddleware} = require('@reduxjs/toolkit');
const {default: mainReducer} = require('./Middleware');

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
