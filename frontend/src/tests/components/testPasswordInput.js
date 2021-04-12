import { shallow } from 'enzyme';
// import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { PasswordInput } from '../../components/FormInputs.jsx';

export const testPasswordInput = () => {
  describe('password input', () => {
    const noop = () => {};

    it('uses custom helper text', () => {
      const errorMessage = 'I thought I had it all together';
      const passwordInput = shallow(
        <PasswordInput
          showPassword={true}
          handleFormChange={noop}
          handleShowPassword={noop}
          error={false}
          errorMessage={errorMessage}
          confirmPassword={false}
        />,
      );
      expect(passwordInput.props().error).toBe(false);
      expect(passwordInput.props().helperText).toBe(errorMessage);
    });

    it('has confirm password label when confirmPassword is true', () => {
      const passwordInput = shallow(
        <PasswordInput
          showPassword={true}
          handleFormChange={noop}
          handleShowPassword={noop}
          error={false}
          errorMessage=""
          confirmPassword={true}
        />,
      );

      expect(passwordInput.props().label).toBe('Confirm Password');
    });

    it('has password label when confirmPassword is false', () => {
      const passwordInput = shallow(
        <PasswordInput
          showPassword={true}
          handleFormChange={noop}
          handleShowPassword={noop}
          error={false}
          errorMessage=""
          confirmPassword={false}
        />,
      );

      expect(passwordInput.props().label).toBe('Password');
    });

    it('is in error mode when error equals true', () => {
      const passwordInput = shallow(
        <PasswordInput
          showPassword={true}
          handleFormChange={noop}
          handleShowPassword={noop}
          error={true}
          errorMessage=""
          confirmPassword={false}
        />,
      );

      expect(passwordInput.props().error).toBe(true);
    });

    it('Password Input renders correctly', () => {
      const passwordInput = shallow(
        <PasswordInput
          showPassword={true}
          handleFormChange={noop}
          handleShowPassword={noop}
          error={false}
          errorMessage=""
          confirmPassword={false}
        />,
      );
      expect(passwordInput).toMatchSnapshot();
    });
  });
};

export default testPasswordInput;
