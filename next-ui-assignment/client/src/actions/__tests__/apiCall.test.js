import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { 
    getData, 
    getNextPageData 
} from '../apiCall';
import { API_RESPONSE } from '../../testData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('testing async action creators', () => {
    let store;
    let fetchSearchData = API_RESPONSE
    beforeEach(() => {
        store = mockStore({});
      });
    it('creates CREATE_SUCCESS when search was successful', () => {
    //     nock('https://localhost:5000')
    //         .get('/api/search') // Route to catch and mock
    //         .reply(200, fetchSearchData); // Mock reponse code and data
  
    //   // Dispatch action to fetch to-dos
    //     return store.dispatch(getData('red'))
    //         .then(() => { // return of async actions
    //             expect(store.getActions()).toMatchSnapshot();
    //         })
    });
});