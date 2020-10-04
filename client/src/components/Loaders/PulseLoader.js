import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import assign from 'domkit/appendVendorPrefix';
import insertKeyframesRule from 'domkit/insertKeyframesRule';

const keyframes = {
  '0%': {
    transform: 'scale(1)',
    opacity: 1,
  },
  '45%': {
    transform: 'scale(0.1)',
    opacity: 0.7,
  },
  '80%': {
    transform: 'scale(1)',
    opacity: 1,
  },
};

const animationName = insertKeyframesRule(keyframes);

class PulseLoader extends PureComponent {
  static getAnimationStyle(param) {
    const animation = [
      animationName,
      '0.75s',
      `${param * 0.12}s`,
      'infinite',
      'cubic-bezier(.2,.68,.18,1.08)',
    ].join(' ');
    const animationFillMode = 'both';

    return {
      animation,
      animationFillMode,
    };
  }

  getBallStyle() {
    return {
      backgroundColor: this.props.color || 'grey',
      width: this.props.size || '15px',
      height: this.props.size || '15px',
      margin: this.props.margin || '2px',
      borderRadius: '100%',
      verticalAlign: this.props.verticalAlign,
    };
  }

  getStyle(param) {
    return assign(this.getBallStyle(param), PulseLoader.getAnimationStyle(param), {
      display: 'inline-block',
    });
  }

  render() {
    return (
      <div id={this.props.id} className={this.props.className}>
        <div style={this.getStyle(1)} />
        <div style={this.getStyle(2)} />
        <div style={this.getStyle(3)} />
      </div>
    );
  }
}

PulseLoader.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  margin: PropTypes.string,
  verticalAlign: PropTypes.string,
};

PulseLoader.defaultProps = {
  id: '',
  className: '',
  color: '',
  size: '',
  margin: '',
  verticalAlign: undefined,
};

export default PulseLoader;
