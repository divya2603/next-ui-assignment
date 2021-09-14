import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from 'redux';
import styled from 'styled-components';

import { getData, getNextPageData, clearData } from './actions/apiCall';
import { debounce } from "./utils";
import {
  ExtraDispatchArguments,
  Props,
  StateProps,
  EventProp
} from './interfaces'
import {
  HEADER_NAME
} from './Constants';
import './App.css';

const SearchResults = lazy(() => import('./Components/SearchForm'));

const Wrapper = styled.section`
padding: 4em;
`;
const Input = styled.input`
padding: 0.5em;
margin: 0.5em;
width: 100%;
border: none;
border-radius: 3px;
`;
const Form = styled.form`
width: 50%;
margin: 0 auto;
`;
const Header = styled.header``;

const mapStateToProps = (state: StateProps) => {
  return {
    searchData: state.searchData.data
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StateProps, ExtraDispatchArguments, AnyAction>)  => {
  return {
    getData: ({ query }) => dispatch(getData({ query })),
    getNextPageData:  ({ query, pageNumber }) => dispatch(getNextPageData({ query, pageNumber })),
    clearData: () => dispatch(clearData())
  }
}

function App(props: Props): JSX.Element {
  const { searchData, getData, getNextPageData, clearData } = props;
  const { data, pageNumber } = searchData || {};

  const [query, setQuery] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(0);

  const containerRef = useRef(null);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1
  }

  useEffect(() => {
    const observer = new IntersectionObserver(scrollObserver, options);
    if(containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if(containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    }
  },[containerRef, options]);

  const scrollObserver = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }

  useEffect(() => {
    setPageNum(pageNumber);
  },[isVisible]);

  useEffect(() => {
    query.length && getNextPageData({ query, pageNumber });
  }, [pageNum]);

  useEffect(() => {
    if (query.length > 0) {
      getData({query});
    } else {
      clearData();
    }
  },[query]);

  const handleSearch = () => {
    console.log(" query ", query);   
  }

  const handleChange = (event: EventProp): void => {
    setQuery(event.target.value);
  }

  const debouncedChangeHandler = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  return (
    <Wrapper className="App">
      <Header className="App-header"> {HEADER_NAME} </Header>
      <Form 
        className="App-header" 
        id="search-form" 
        onSubmit={e => {
        e.preventDefault();
        handleSearch();
      }}>
        <Input 
          type="text"
          onChange={debouncedChangeHandler} 
          placeholder="Search artists, albums, and/or songs... "
        />
        <Suspense fallback={<div>Loading…</div>}>
          <SearchResults 
            data={data} 
            containerRef={containerRef} 
            query={query}
          />
        </Suspense>
      </Form>
    </Wrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
