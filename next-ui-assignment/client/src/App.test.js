import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from './App';
import searchData from './testData';
import styled from 'styled-components';

const Input = styled.input;

const mockStore = configureMockStore({});
configure({adapter: new Adapter()});

const mockFunc = {
  handleSearch: jest.fn(),
  preventDefault: jest.fn()
};

const getPage = renderType => {
  const store = mockStore({
      searchData: searchData
  });

  const Page = (
      <Provider store={store}>
          <App />
      </Provider>
  );
  if (renderType === 'mount') {
      return mount(Page);
  }
  return shallow(Page);
};

describe('Main Component', () => {
  let page;
  it('should render with given state from Redux store', () => {
    page = getPage();
    expect(page).toMatchSnapshot();
  });
});