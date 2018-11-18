import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import { getColorsByTypeAndValue } from './utils';

const DetailsLabel = ({ children, type, value }) => {
  const color = getColorsByTypeAndValue(type, value);

  return <Wrapper color={color}>{children}</Wrapper>;
};

DetailsLabel.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default DetailsLabel;
