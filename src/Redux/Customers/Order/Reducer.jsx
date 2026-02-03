import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILURE,
  RETURN_ORDER_REQUEST,
  RETURN_ORDER_SUCCESS,
  RETURN_ORDER_FAILURE,
} from './ActionType';

const initialState = {
  orders: [],
  order: null,
  error: null,
  loading: false,
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ORDER_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case GET_ORDER_BY_ID_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ORDER_HISTORY_REQUEST:
      return {
        loading: true,
        orders: [],
      };
    case GET_ORDER_HISTORY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case GET_ORDER_HISTORY_FAILURE:
      return {
        loading: false,
        error: action.payload,
        orders: [],
      };
    case CANCEL_ORDER_REQUEST:
    case RETURN_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CANCEL_ORDER_SUCCESS:
    case RETURN_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case CANCEL_ORDER_FAILURE:
    case RETURN_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


