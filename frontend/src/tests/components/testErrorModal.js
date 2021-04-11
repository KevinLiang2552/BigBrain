import { shallow } from 'enzyme';
import React from 'react';
import ErrorModal from '../../components/ErrorModal.jsx';

export const testErrorModal = () => {
  describe('Error Modal', () => {
    const noop = () => {};

    it('uses custom error message', () => {
      const errorMessage = "IT DOESN'T WORK AHHH";
      const errorModal = shallow(
        <ErrorModal
          errorMessage={errorMessage}
          modalState={true}
          setModalState={noop}
        />,
      );
      expect(errorModal.text().includes(errorMessage)).toBe(true);
      expect(errorModal.text()).toBe('Error' + errorMessage + 'Close');
    });

    // it('has correct modal state', () => {
    //   const errorModal = shallow(
    //     <ErrorModal errorMessage="" modalState={true} setModalState={noop} />,
    //   );
    //   expect(errorModal).to.
    //   expect(errorModal).to.have.property('onClose', true);
    // });

    // Snapshot
    it('Error modal renders correctly', () => {
      const errorModal = shallow(
        <ErrorModal
          errorMessage=""
          modalState={true}
          setModalState={noop}></ErrorModal>,
      );
      expect(errorModal).toMatchSnapshot();
    });
  });
};

export default testErrorModal;
