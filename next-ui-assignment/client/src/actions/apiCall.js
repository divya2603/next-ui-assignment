import { 
  GET_DATA, 
  ERROR_GENERATED, 
  GET_NEXT_PAGE_DATA, 
  CLEAR_DATA 
} from './actionConstant';

export function fetchPostsSuccess(payload) {
  return {
    type: GET_DATA,
    payload
  }
}

export function fetchMorePostsSuccess(payload) {
  return {
    type: GET_NEXT_PAGE_DATA,
    payload
  }
}

export function clearPosts() {
  return {
    type: CLEAR_DATA
  }
}

export function onError() {
  return {
    type: ERROR_GENERATED
  }
}

async function fetchResults({ query, pageNumber }) {
     const response = await fetch('/api/search', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query, pageNumber })
    });
    const content = await response.json();
    return content;
}

export function getData({ query }) {
  return (dispatch) => {
    try {
      return fetchResults({ query }).then((response) => {
        dispatch(fetchPostsSuccess(response))
      });

    } catch(error) {
      return onError(error);
    }
  }
};

export function getNextPageData({ query, pageNumber }) {
  return (dispatch) => {
    try {
      return fetchResults({ query, pageNumber }).then((response) => {
        dispatch(fetchMorePostsSuccess(response))
      });

    } catch(error) {
      return onError(error);
    }
  }
}

export function clearData() {
  return dispatch => {
    return dispatch(clearPosts())
  }
}
