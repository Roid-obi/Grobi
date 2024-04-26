'use client';
import Input from './Input';
import Icon from '@/assets/icons/input-user-icon.svg';
import { useState } from 'react';

export default function ExampleInput() {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* default input with label & error is false*/}
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          placeHolder="Username..."
          value={inputValue}
          type="no-icon"
          labelText="Default Input"
          error={false}
          errorMessage="error info"
        />
        {/* default input with label & error is true*/}
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          placeHolder="Username..."
          type="no-icon"
          value={inputValue}
          labelText="Default Input"
          error={true}
          errorMessage="error info"
        />

        {/* input with no label text & error is false*/}
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          placeHolder="Username..."
          type="no-icon"
          value={inputValue}
          error={false}
          errorMessage="error info"
        />
        {/* input with no label text & error is true*/}
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          placeHolder="Username..."
          type="no-icon"
          value={inputValue}
          error={true}
          errorMessage="error info"
        />

        {/* password input with label & error is false*/}
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          placeHolder="Password..."
          type="password"
          value={inputValue}
          labelText="Password Input"
          error={false}
          errorMessage="error info"
        />
        {/* password input with label & error is true*/}
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          placeHolder="Password..."
          type="password"
          value={inputValue}
          labelText="Password Input"
          error={true}
          errorMessage="error info"
        />
      </div>
    </>
  );
}
