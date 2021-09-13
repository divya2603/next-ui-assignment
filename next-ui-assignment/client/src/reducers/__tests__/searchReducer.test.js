import reducer from '../searchReducer';
import { 
    INITIAL_STATE_DATA, 
    API_RESPONSE,
    NEXT_PAGE_API_RESPONSE
} from '../../testData';
import { 
    GET_DATA, 
    GET_NEXT_PAGE_DATA
} from '../../actions/actionConstant';
  
  describe('Test Reducers', () => {
    const initialState = {...INITIAL_STATE_DATA};

    it('returns the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('handles search request', () => {
        expect(reducer(initialState, { type: GET_DATA, payload:API_RESPONSE })).toEqual({
          ...initialState,
          data: API_RESPONSE,
          loading: false,
        });
    });
    it('handles nextpage request', () => {
        expect(reducer(initialState, { type: GET_NEXT_PAGE_DATA, payload: NEXT_PAGE_API_RESPONSE })).toEqual({
          ...initialState,
          data: NEXT_PAGE_API_RESPONSE,
          loading: false,
        });
    });
  });

