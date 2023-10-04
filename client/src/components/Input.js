import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const InputField = styled.input`
  flex: 1;
  padding: 0.5rem;
  border-radius: var(--borderRadius, 4px);
  border: 1px solid var(--other-outlined-border, rgba(0, 0, 0, 0.15));
  font-size: 16px;
  margin-right: 0.5rem;
`;

const SearchButton = styled.button`
  background-color: #1F7B44;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 16px;
  cursor: pointer;
`;

function Input({ title, onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    onSearch(inputValue);
  };

  return (
    <InputContainer>
      <InputField
        type="text"
        placeholder={`Enter ${title}...`}
        value={inputValue}
        onChange={handleInputChange}
      />
      <SearchButton onClick={handleButtonClick}>{title}</SearchButton>
    </InputContainer>
  );
}

export default Input;
