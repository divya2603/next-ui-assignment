import { MutableRefObject } from "react";

export interface ResponseArray {
  artistId: number;
}
  
export interface RootState {
  response?: null | ResponseArray[];
}
export interface ExtraDispatchArguments {
  searchQuery?: string;
  pageNumber?: number;
}

export interface Props {
  searchData?: SearchData;
  getData?: ({query: string}) => {};
  getNextPageData?: ({query: string, pageNumber: number}) => {};
  clearData?: () => {};
}

export interface SearchData {
  data: ApiResponse[];
  loading: boolean;
  pageNumber: number;
}
export interface ApiResponse {
  artistName: string;
  trackName: string;
  collectionName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
}
export interface DispatchProps {
  apiCall: () => void
}
export interface OwnProps {

}
export interface StateProps {
  searchData: {
    data: SearchData
  }
}

export interface EventProp {
  target: {
    value: string
  }
}

export interface SearchFormProps {
  data: ApiResponse[];
  containerRef: MutableRefObject<any>;
  query: string;
}