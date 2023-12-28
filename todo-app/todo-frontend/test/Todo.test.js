/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../src/Todos/Todo';

const mockDelete = jest.fn();
const mockComplete = jest.fn();

const sampleTodo = {
  id: 1,
  text: 'This is for testing only',
  done: false,
};

test('renders Todo component with not done info', () => {
  const { getByText } = render(
    <Todo todo={sampleTodo} onClickDelete={mockDelete} onClickComplete={mockComplete} />
  );

  expect(getByText(/This todo is not done/i)).toBeInTheDocument();
  expect(getByText(/This is for testing only/i)).toBeInTheDocument();
});

test('renders Todo component with done info', () => {
  const doneTodo = { ...sampleTodo, done: true };

  const { getByText } = render(
    <Todo todo={doneTodo} onClickDelete={mockDelete} onClickComplete={mockComplete} />
  );

  expect(getByText(/This todo is done/i)).toBeInTheDocument();
  expect(getByText(/This is for testing only/i)).toBeInTheDocument();
});

test('calls onClickDelete when delete button is clicked', () => {
  const { getByText } = render(
    <Todo todo={sampleTodo} onClickDelete={mockDelete} onClickComplete={mockComplete} />
  );

  fireEvent.click(getByText(/Delete/i));
  expect(mockDelete).toHaveBeenCalledWith(sampleTodo);
});

test('calls onClickComplete when set as done button is clicked', () => {
  const { getByText } = render(
    <Todo todo={sampleTodo} onClickDelete={mockDelete} onClickComplete={mockComplete} />
  );

  fireEvent.click(getByText(/Set as done/i));
  expect(mockComplete).toHaveBeenCalledWith(sampleTodo);
});
