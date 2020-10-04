import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import CountrySelector from '..';

jest.mock('../../../constants/countries', () => ({
  COUNTRIES: [
    {
      countryName: 'Afghanistan',
      ISOALPHA2Code: 'AF',
      ISOALPHA3Code: 'AFG',
      ISONumericalCode: 4,
    },
    {
      countryName: 'Aland Islands',
      ISOALPHA2Code: 'AX',
      ISOALPHA3Code: 'ALA',
      ISONumericalCode: 248,
    },
    {
      countryName: 'Albania',
      ISOALPHA2Code: 'AL',
      ISOALPHA3Code: 'ALB',
      ISONumericalCode: 8,
    },
  ],
}));

const mockComponent = props => <CountrySelector {...props} />;

describe('<CountrySelector />', () => {
  it('should render component with no props provided', () => {
    const props = {};
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with defaultCountry provided', () => {
    const props = {
      defaultCountry: 'Afghanistan',
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with defaultISOALPHA2Code provided', () => {
    const props = {
      defaultISOALPHA2Code: 'AF',
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with defaultISOALPHA3Code provided', () => {
    const props = {
      defaultISOALPHA3Code: 'AFG',
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with defaultISONumericalCode provided', () => {
    const props = {
      defaultISONumericalCode: 4,
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with a wrong defaultCountry provided', () => {
    const props = {
      defaultCountry: 'This is a test',
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('getCountry should return correct value for the wrong input', () => {
    const props = {
      getSelectedCountry: () => {},
    };
    const param = 'THIS IS WRONG';
    const expected = {
      countryName: 'Afghanistan',
      ISOALPHA2Code: 'AF',
      ISOALPHA3Code: 'AFG',
      ISONumericalCode: 4,
    };
    const instance = shallow(mockComponent(props)).instance();

    const result = instance.getCountry(param);

    expect(result).toEqual(expected);
  });

  it('should set state correctly when componentWillReceiveProps is called whith new props', () => {
    const props = {
      defaultCountry: 'Afghanistan',
      getSelectedCountry: () => {},
    };
    const nextProps = {
      defaultCountry: 'Aland Islands',
      getSelectedCountry: () => {},
    };
    const expected = {
      countryName: 'Aland Islands',
      ISOALPHA2Code: 'AX',
      ISOALPHA3Code: 'ALA',
      ISONumericalCode: 248,
    };
    const instance = shallow(mockComponent(props)).instance();

    instance.componentWillReceiveProps(nextProps);

    expect(instance.state.currentCountry).toEqual(expected);
  });

  it('should not set state correctly when componentWillReceiveProps is called whith the same props', () => {
    const setState = jest.fn();
    const props = {
      defaultCountry: 'Afghanistan',
      getSelectedCountry: () => {},
    };
    const nextProps = {
      defaultCountry: 'Afghanistan',
      getSelectedCountry: () => {},
    };
    const instance = shallow(mockComponent(props)).instance();
    instance.setState = setState;

    instance.componentWillReceiveProps(nextProps);

    expect(setState).not.toHaveBeenCalled();
  });

  it('should not call getSelectedCountry when componentWillUpdate is called whith the same country', () => {
    const getSelectedCountry = jest.fn();
    const props = {
      defaultCountry: 'Afghanistan',
      getSelectedCountry,
    };
    const nextState = {
      currentCountry: {
        countryName: 'Afghanistan',
      },
    };
    const instance = shallow(mockComponent(props)).instance();

    instance.componentWillUpdate(props, nextState);

    expect(getSelectedCountry).not.toHaveBeenCalled();
  });

  it('should set state correctly when handleChangeCountry is called', () => {
    const props = {
      getSelectedCountry: () => {},
    };
    const event = {
      target: {
        value: '  AfG  ',
      },
    };
    const expected = {
      countryName: 'Afghanistan',
      ISOALPHA2Code: 'AF',
      ISOALPHA3Code: 'AFG',
      ISONumericalCode: 4,
    };
    const instance = shallow(mockComponent(props)).instance();

    instance.handleChangeCountry(event);

    expect(instance.state.displayedCountries).toEqual([expected]);
  });

  it('should set state correctly when handleSelectCountry is called', () => {
    const props = {
      getSelectedCountry: () => {},
    };
    const country = { test: 'test' };
    const instance = shallow(mockComponent(props)).instance();

    instance.handleSelectCountry(country);

    expect(instance.state.currentCountry).toEqual(country);
  });

  it('should call component.focus() when focusInput is called whith valid component', () => {
    const focus = jest.fn();
    const props = {
      getSelectedCountry: () => {},
    };
    const component = { focus };
    const instance = shallow(mockComponent(props)).instance();

    instance.focusInput(component);

    expect(focus).toHaveBeenCalled();
  });

  it('should set state and call addEventListener when show is called with correct tagName', () => {
    const addEventListener = jest.fn();
    const props = {
      getSelectedCountry: () => {},
    };
    const event = {
      target: {
        tagName: 'test',
      },
    };
    const instance = shallow(mockComponent(props)).instance();
    global.document.addEventListener = addEventListener;
    instance.state.isListVisible = false;

    instance.show(event);

    expect(instance.state.isListVisible).toEqual(true);
    expect(addEventListener).toHaveBeenCalledWith('click', instance.hide);
  });

  it('should set state and  not call addEventListener when show is called with wrong tagName', () => {
    const addEventListener = jest.fn();
    const props = {
      getSelectedCountry: () => {},
    };
    const event = {
      target: {
        tagName: 'input',
      },
    };
    const instance = shallow(mockComponent(props)).instance();
    global.document.addEventListener = addEventListener;
    instance.state.isListVisible = false;

    instance.show(event);

    expect(instance.state.isListVisible).toEqual(true);
    expect(addEventListener).not.toHaveBeenCalledWith('click', instance.hide);
  });

  it('should set state and call removeEventListener when hide is called with correct tagName', () => {
    const removeEventListener = jest.fn();
    const props = {
      getSelectedCountry: () => {},
    };
    const event = {
      target: {
        tagName: 'test',
      },
    };
    const instance = shallow(mockComponent(props)).instance();
    global.document.removeEventListener = removeEventListener;
    instance.state.isListVisible = true;

    instance.hide(event);

    expect(instance.state.isListVisible).toEqual(false);
    expect(removeEventListener).toHaveBeenCalledWith('click', instance.hide);
  });

  it('should not set state and not call removeEventListener when hide is called with wrong tagName', () => {
    const removeEventListener = jest.fn();
    const props = {
      getSelectedCountry: () => {},
    };
    const event = {
      target: {
        tagName: 'input',
      },
    };
    const instance = shallow(mockComponent(props)).instance();
    global.document.removeEventListener = removeEventListener;
    instance.state.isListVisible = true;

    instance.hide(event);

    expect(instance.state.isListVisible).toEqual(true);
    expect(removeEventListener).not.toHaveBeenCalledWith('click', instance.hide);
  });

  it('should call handleSelectCountry when country <li> element is clicked', () => {
    const handleSelectCountry = jest.fn();
    const props = {
      getSelectedCountry: () => {},
    };
    const event = {
      target: {
        tagName: 'test',
      },
    };
    const arg = {
      countryName: 'Afghanistan',
      ISOALPHA2Code: 'AF',
      ISOALPHA3Code: 'AFG',
      ISONumericalCode: 4,
    };
    const node = shallow(mockComponent(props));
    const instance = node.instance();

    instance.handleSelectCountry = handleSelectCountry;
    instance.show(event);

    node.find('[data-country="AF"]').simulate('click');

    expect(handleSelectCountry).toHaveBeenCalledWith(arg);
  });
});
