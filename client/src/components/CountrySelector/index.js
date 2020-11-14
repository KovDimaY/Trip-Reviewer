import React from 'react';
import PropTypes from 'prop-types';

import { COUNTRIES } from '../../constants/countries';

import './styles.css';

class CountrySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedCountries: COUNTRIES,
      isListVisible: false,
      currentCountry: this.getCountry(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const newCountry = this.getCountry(nextProps);
    const { currentCountry } = this.state;

    if (newCountry.countryName !== currentCountry.countryName) {
      this.setState({ currentCountry: newCountry });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { currentCountry } = this.state;
    const { currentCountry: newCountry } = nextState;

    if (currentCountry.countryName !== newCountry.countryName) {
      this.props.getSelectedCountry(newCountry);
    }
  }

  getCountry = props => {
    let country = {};

    if (props.defaultCountry) {
      country = COUNTRIES.find(item => item.countryName === props.defaultCountry);
    } else if (props.defaultISOALPHA2Code) {
      country = COUNTRIES.find(item => item.ISOALPHA2Code === props.defaultISOALPHA2Code);
    } else if (props.defaultISOALPHA3Code) {
      country = COUNTRIES.find(item => item.ISOALPHA3Code === props.defaultISOALPHA3Code);
    } else if (props.defaultISONumericalCode) {
      country = COUNTRIES.find(item => item.ISONumericalCode === props.defaultISONumericalCode);
    }

    return country && Object.keys(country).length ? country : COUNTRIES[0];
  };

  handleSelectCountry = country => {
    this.setState({ currentCountry: country });
  };

  handleChangeCountry = e => {
    const query = e.target.value.toLowerCase().trim();

    const displayedCountries = COUNTRIES.filter(
      item => item.countryName.toLowerCase().search(query) >= 0
    );

    this.setState({ displayedCountries });
  };

  focusInput = component => {
    if (component) {
      component.focus();
    }
  };

  show = e => {
    this.setState({ isListVisible: true });

    if (typeof window !== 'undefined' && e.target.tagName.toUpperCase() !== 'INPUT') {
      document.addEventListener('click', this.hide);
    }
  };

  hide = e => {
    if (typeof window !== 'undefined' && e.target.tagName.toUpperCase() !== 'INPUT') {
      this.setState({ isListVisible: false });
      document.removeEventListener('click', this.hide);
    }
  };

  render() {
    const { currentCountry, isListVisible, displayedCountries } = this.state;

    return (
      <div className="country-selector-container">
        <div className="dropdown">
          <div className="btn dropdown-toggle c-select" onClick={this.show}>
            <span>
              <div
                alt="flag"
                className={
                  currentCountry.ISOALPHA2Code
                    ? `flag ${currentCountry.ISOALPHA2Code.toLowerCase()} fnone c-dropdown-flag`
                    : 'c-dropdown-flag'
                }
              />
              {currentCountry.countryName}
            </span>
          </div>
          <div
            className="dropdown-menu c-dropdown-menu"
            style={isListVisible ? { display: 'block' } : { display: 'none' }}
          >
            <input
              className="c-dropdown-input"
              type="text"
              ref={component => this.focusInput(component)}
              onInput={this.handleChangeCountry}
            />
            <div className="c-dropdown-menu-overflow">
              <ul className="c-dropdown-ul">
                {displayedCountries.map((item, index) => {
                  const flag = item.ISOALPHA2Code.toLowerCase();
                  return (
                    <li
                      tabIndex={index}
                      className="dropdown-item c-dropdown-item"
                      data-country={item.ISOALPHA2Code}
                      key={item.ISOALPHA2Code}
                      onClick={() => this.handleSelectCountry(item)}
                    >
                      <div data-option={`${item.ISOALPHA2Code}`}>
                        <div className={`flag ${flag} fnone c-dropdown-flag`} /> {item.countryName}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CountrySelector.propTypes = {
  defaultCountry: PropTypes.string, // eslint-disable-line react/no-unused-prop-types, max-len, - it is a bug of eslint
  defaultISOALPHA2Code: PropTypes.string, // eslint-disable-line react/no-unused-prop-types, max-len, - it is a bug of eslint
  defaultISOALPHA3Code: PropTypes.string, // eslint-disable-line react/no-unused-prop-types, max-len, - it is a bug of eslint
  defaultISONumericalCode: PropTypes.number, // eslint-disable-line react/no-unused-prop-types, max-len, - it is a bug of eslint
  getSelectedCountry: PropTypes.func.isRequired,
};

CountrySelector.defaultProps = {
  defaultCountry: '',
  defaultISOALPHA2Code: '',
  defaultISOALPHA3Code: '',
  defaultISONumericalCode: null,
};

export default CountrySelector;
