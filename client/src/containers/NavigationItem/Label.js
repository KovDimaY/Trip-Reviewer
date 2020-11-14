import styled from 'styled-components';
import PropTypes from 'prop-types';

const getCalculatedStyles = ({ sidenav, limit }) => `
  @media (max-width: ${limit}px) {
    margin-left: ${sidenav ? '10px' : '0'}
  }
`;

const Label = styled.span`
  margin-left: 10px;

  &:hover {
    color: white;
  }

  ${props => getCalculatedStyles(props)}
`;

Label.propTypes = {
  limit: PropTypes.number,
  sidenav: PropTypes.number,
};

Label.defaultProps = {
  limit: 0,
  sidenav: 0,
};

export default Label;
