import { 
  GET_DATA, 
  GET_NEXT_PAGE_DATA,
  CLEAR_DATA
 } from '../actions/actionConstant';

const INITIAL_STATE = {
  data: {
    data: [],
    pageNumber: 0
  },
  loading : false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
     case GET_DATA:
      return {
        ...state,
        data: payload,
        loading: false
      }
      case GET_NEXT_PAGE_DATA:
        return {
          ...state,
          data: { data: state.data.data.concat(payload.data), pageNumber: payload.pageNumber },
          loading: false
        }
      case CLEAR_DATA:
        return {
          state: INITIAL_STATE
        }
     default:
      return state
    }
}