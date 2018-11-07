import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  background: ${({ color }) => color};
  display: inline-block;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 5px;
  color: #fff;
`;

Wrapper.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Wrapper;
