import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  GET_API_DATA,
  HTTP,
  JUST_STORE,
  MAKE_API_CALL,
  staticValues,
} from '../Common/constent';
import {Toast, mainLog} from '../Common/utils';
import {addCount} from './Red-Action';

const axios = require('axios').default;

export const apiCall = createAsyncThunk(
  GET_API_DATA,
  async (action, {dispatch, getState, rejectWithValue}) => {
    mainLog('Action_in_apiCall', action.requestType);

    try {
      if (action.type && action.type === JUST_STORE) {
        return action;
      } else {
        let method = 'post';
        let header = HTTP.AuthHeader;
        let reqData = JSON.stringify(action.jsonData);

        if (action.get) {
          method = 'get';
        }

        if (action.noAuth) {
          header = HTTP.HEADER;
        } else if (action.multipart) {
          header = HTTP.FormHeader;
          reqData = JSON.parse(reqData);
        }

        const config = {
          method: method,
          url: action.requestUrl.trim(),
          data: reqData,
          headers: header,
        };

        mainLog('Axios config : ' + action.requestType, config);
        const apiRes = await axios(config, {timeout: 2}); //making api call for all
        mainLog('Api_response_in_middleware', apiRes);

        switch (action.requestType) {
          case staticValues.sampleApi:
            break;

          default:
            break;
        }

        return {
          requestType: action.requestType,
          jsonData: apiRes.data,
          requestData: action.jsonData,
          extraData: action.extraData,
        };
      }
    } catch (err) {
      console.group(MAKE_API_CALL + ' ERROR :');
      console.log(err);
      console.groupEnd();
      if (err.response.status === 404) {
        Toast('404 api error');
      }
    }
  },
);

const initialState = {
  loader: false,
  curVal: 0,
};

const reducerSlice = createSlice({
  name: 'main',
  initialState,
  extraReducers: builder => {
    //pending state invoked while api calling on Process
    builder.addCase(apiCall.pending, (state, action) => {
      state.loader = true;
    });

    builder.addCase(apiCall.fulfilled, (state, action) => {
      state.loader = false;
      const reqType = action.payload.requestType;

      switch (reqType) {
        case staticValues.addCount:
          state.curVal = state.curVal + 1;
          break;

        case staticValues.minusCount:
          state.curVal = state.curVal - 1;
          break;

        default:
          break;
      }

      console.log('apiCall_fulfilled_state :', action);
    });

    builder.addCase(apiCall.rejected, (state, action) => {
      console.log('apiCall_rejected_state :', action);
    });
  },
});

const mainReducer = reducerSlice.reducer;

export default mainReducer;
