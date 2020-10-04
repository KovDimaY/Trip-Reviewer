import React from 'react';
import { create } from 'react-test-renderer';

import DetailsLabel from '..';
import { TYPES } from '../utils';

const mockComponent = props => <DetailsLabel {...props} />;

describe('<DetailsLabel />', () => {
  describe('Duration', () => {
    const props = {
      children: 'children',
      type: TYPES.duration,
    };

    it('should render very bad duration', () => {
      props.value = 1;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render bad duration', () => {
      props.value = 3;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render ok duration', () => {
      props.value = 8;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render good duration', () => {
      props.value = 15;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render very good duration', () => {
      props.value = 32;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('Expences', () => {
    const props = {
      children: 'children',
      type: TYPES.expences,
    };

    it('should render very bad expences', () => {
      props.value = 99;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render bad expences', () => {
      props.value = 101;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render ok expences', () => {
      props.value = 501;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render good expences', () => {
      props.value = 1001;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render very good expences', () => {
      props.value = 5001;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('Rating', () => {
    const props = {
      children: 'children',
      type: TYPES.rating,
    };

    it('should render very bad rating', () => {
      props.value = 1;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render bad rating', () => {
      props.value = 3;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render ok rating', () => {
      props.value = 8;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render good rating', () => {
      props.value = 15;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render very good rating', () => {
      props.value = 32;
      const tree = create(mockComponent(props)).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
