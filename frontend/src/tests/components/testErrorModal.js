import { shallow } from 'enzyme';
import React from 'react';
import ErrorModal from '../../components/ErrorModal.jsx';

export const testErrorModal = () => {
  describe('Error Modal', () => {
    const noop = () => {};

    it('use custom error message', () => {
      const errorMessage = "IT DOESN'T WORK AHHH";
      const errorModal = shallow(
        <ErrorModal
          errorMessage={errorMessage}
          modalState={true}
          setModalState={noop}
        />,
      );
      expect(errorModal.text()).toBe('Error' + errorMessage + 'Close');
    });
  });
};

export default testErrorModal;
