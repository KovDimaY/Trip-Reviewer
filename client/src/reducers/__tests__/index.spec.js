import reducer from '../index';

describe('index reducer', () => {
  it('connects correctly all the reducers', () => {
    const initialState = {};
    const action = {
      type: 'TEST',
      payload: 'test',
    };
    const expected = {
      trips: {},
      users: {},
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expected);
  });
});
