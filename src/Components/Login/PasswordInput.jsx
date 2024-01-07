import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import React, { useState } from 'react';

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`relative flex w-full items-center md:w-96 ${
        props.confirm && 'mt-4'
      }`}>
      <input
        type={showPassword ? 'text' : 'password'}
        className="flex-grow rounded border p-2"
        placeholder={
          props.confirm ? 'Confirm your password...' : 'Enter your password'
        }
        value={props.confirm ? props.confirmPassword : props.password}
        onChange={
          props.confirm
            ? (e) => props.setConfirmPassword(e.target.value)
            : (e) => props.setPassword(e.target.value)
        }
      />
      <button
        onClick={(e) => togglePasswordVisibility(e)}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
      </button>
    </div>
  );
};

export default PasswordInput;
