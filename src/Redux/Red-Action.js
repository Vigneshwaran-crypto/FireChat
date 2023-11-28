import {
  HTTP,
  JUST_STORE,
  MAKE_API_CALL,
  staticValues,
} from '../Common/constent';

export const addCount = jsonData => {
  return {
    type: JUST_STORE,
    requestType: staticValues.addCount,
    jsonData,
  };
};

export const minusCount = jsonData => {
  return {
    type: JUST_STORE,
    requestType: staticValues.minusCount,
    jsonData,
  };
};

export const sampleApi = jsonData => {
  return {
    type: MAKE_API_CALL,
    requestType: staticValues.sampleApi,
    requestUrl: HTTP.GET_ALL_PRODUCTS,
    jsonData,
    get: true,
    noAuth: true,
  };
};
