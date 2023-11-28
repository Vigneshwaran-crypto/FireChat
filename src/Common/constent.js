export const AuthToken = 'Bearer ';
export const GET_API_DATA = 'GET_API_DATA';

export const MAKE_API_CALL = 'MAKE_API_CALL';
export const JUST_STORE = 'JUST_STORE';

export const staticValues = {
  sampleApi: 'sampleApi',
  addCount: 'addCount',
  minusCount: 'minusCount',
};

export const HTTP = {
  GET_ALL_PRODUCTS: 'https://fakestoreapi.com/products',

  //Header For Api Call configuration ;
  HEADER: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },

  AuthHeader: {
    'Content-Type': 'application/json',
    Authorization: AuthToken,
  },

  FormHeader: {
    'Content-Type': 'mutipart/form-data',
    Authorization: AuthToken,
  },
};
