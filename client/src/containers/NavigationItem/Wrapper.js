import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const applySidenav = () => `
  color: #bababa;
  padding: 10px;
  border-top: 1px solid #404040;
`;

const applyRegular = limit => `
  color: #ffffff;
  padding: 0 20px;
  display: inline-block;

  &:hover {
    background: #009eb3;
    font-size: 20px;
    text-shadow: 1px 1px 20px white;
  }

  &:active {
    background: #0495a8;
    font-size: 19px;
    text-shadow: 1px 1px 10px white;
  }

  @media (max-width: ${limit}px) {
    font-size: 16px;
    padding: 0 15px;

    &:hover {
      font-size: 18px;
    }

    &:active {
      font-size: 17px;
    }
  }
`;

const Wrapper = styled(Link)`
  font-weight: 300;
  font-size: 18px;
  display: block;

  ${({ sidenav, limit }) => (sidenav ? applySidenav() : applyRegular(limit))}
`;

Wrapper.propTypes = {
  limit: PropTypes.number,
  sidenav: PropTypes.number,
};

Wrapper.defaultProps = {
  limit: 0,
  sidenav: false,
};

export default Wrapper;
