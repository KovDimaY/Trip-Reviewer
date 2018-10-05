import React from 'react';
import PropTypes from 'prop-types';

import { COUNTRIES } from '../../constants/countries';

import './styles.css';

class CountrySelector extends React.Component {
  constructor(props) {
    super(props);

    let defaultCountry = {};

    if (this.props.defaultCountry) {
      defaultCountry = COUNTRIES
        .find(item => item.countryName === this.props.defaultCountry);
    } else if (this.props.defaultISOALPHA2Code) {
      defaultCountry = COUNTRIES
        .find(item => item.ISOALPHA2Code === this.props.defaultISOALPHA2Code);
    } else if (this.props.defaultISOALPHA3Code) {
      defaultCountry = COUNTRIES
        .find(item => item.ISOALPHA3Code === this.props.defaultISOALPHA3Code);
    } else if (this.props.defaultISONumericalCode) {
      defaultCountry = COUNTRIES
        .find(item => item.ISONumericalCode === this.props.defaultISONumericalCode);
    }

    this.state = {
      defaultPropsCountry: defaultCountry,
      displayedCountries: COUNTRIES,
      isListVisible: false,
      isFirst: true,
      currentCountry: Object.keys(defaultCountry).length
        ? defaultCountry.countryName
        : 'United States of America',
      ISOALPHA2Code: Object.keys(defaultCountry).length
        ? defaultCountry.ISOALPHA2Code
        : 'US',
      ISOALPHA3Code: Object.keys(defaultCountry).length
        ? defaultCountry.ISOALPHA3Code
        : 'USA',
      ISONumericalCode: Object.keys(defaultCountry).length
        ? defaultCountry.ISONumericalCode
        : 840,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.currentCountry !== nextState.currentCountry &&
            this.state.ISOALPHA2Code !== nextState.ISOALPHA2Code &&
            this.state.ISOALPHA3Code !== nextState.ISOALPHA3Code &&
            this.state.ISONumericalCode !== nextState.ISONumericalCode) {
      this.props.getSelectedCountry(
        {
          countryName: nextState.currentCountry,
          ISOALPHA2Code: nextState.ISOALPHA2Code,
          ISOALPHA3Code: nextState.ISOALPHA3Code,
          ISONumericalCode: nextState.ISONumericalCode,
        },
      );
    }
  }

  handleSelectCountry = (countryName, ISOALPHA2Code, ISOALPHA3Code, ISONumericalCode) => {
    this.setState({
      ...this.state,
      currentCountry: countryName,
      ISOALPHA2Code,
      ISOALPHA3Code,
      ISONumericalCode,
    });
  }

  handleChangeCountry = (e) => {
    const query = e.target.value.toLowerCase().trim();

    const displayedCountries = COUNTRIES
      .filter(item => item.countryName.toLowerCase().search(query) >= 0);

    this.setState({ displayedCountries });
  }

  focusInput = (component) => {
    if (component) {
      component.focus();
    }
  }

  show = (e) => {
    this.setState({
      ...this.state,
      isListVisible: true,
    });

    if (typeof window !== 'undefined' && e.target.tagName.toUpperCase() !== 'INPUT') {
      document.addEventListener('click', this.hide);
    }
  }

  hide = (e) => {
    if (typeof window !== 'undefined' && e.target.tagName.toUpperCase() !== 'INPUT') {
      this.setState({
        ...this.state,
        isListVisible: false,
      });
      document.removeEventListener('click', this.hide);
    }
  }

  render() {
    const {
      currentCountry, isListVisible,
      ISOALPHA2Code, displayedCountries,
    } = this.state;

    return (
      <div className="country-selector-container">
        <div className="dropdown">
          <div className="btn dropdown-toggle c-select" onClick={this.show}>
            <span>
              <div
                alt="flag"
                className={
                  ISOALPHA2Code
                      ? `flag ${ISOALPHA2Code.toLowerCase()} fnone c-dropdown-flag`
                      : 'c-dropdown-flag'
                }
              />{currentCountry}
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
              <ul className="c-dropdown-ul">{
                displayedCountries.map((item, index) => {
                    const flag = item.ISOALPHA2Code.toLowerCase();
                    return (
                      <li
                        tabIndex={index}
                        className="dropdown-item c-dropdown-item"
                        key={item.ISOALPHA2Code}
                        onClick={() =>
                          this.handleSelectCountry(
                            item.countryName,
                            item.ISOALPHA2Code,
                            item.ISOALPHA3Code,
                            item.ISONumericalCode,
                          )
                        }
                      >
                        <div data-option={`${item.ISOALPHA2Code}`}>
                          <div className={`flag ${flag} fnone c-dropdown-flag`} /> {item.countryName}
                        </div>
                      </li>
                    );
                })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CountrySelector.propTypes = {
  defaultCountry: PropTypes.string,
  defaultISOALPHA2Code: PropTypes.string,
  defaultISOALPHA3Code: PropTypes.string,
  defaultISONumericalCode: PropTypes.number,
  getSelectedCountry: PropTypes.func,
};

CountrySelector.defaultProps = {
  defaultCountry: '',
  defaultISOALPHA2Code: '',
  defaultISOALPHA3Code: '',
  defaultISONumericalCode: null,
  getSelectedCountry: () => {},
};

export default CountrySelector;
