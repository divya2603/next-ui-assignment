export const INITIAL_DATA = {
    data: [],
    pageNumber: 0
}

export const INITIAL_STATE_DATA = {
  data: {
    data: [],
    pageNumber: 0
  },
  loading : false,
};

export const API_RESPONSE = {
    "data": [{"artistId": "159260351", "artistName": "Taylor Swift"},{"artistId": "159260352", "artistName": "Drake"}],
    "pageNumber": 0
}

export const NEXT_PAGE_API_RESPONSE = {
  "data": [{"artistId": "159260351", "artistName": "Taylor Swift1"},
  {"artistId": "159260352", "artistName": "Drake1"},
  {"artistId": "159260353", "artistName": "Taylor Swift2"},
  {"artistId": "159260354", "artistName": "Drake2"}],
  "pageNumber": 0
}