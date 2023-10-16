/**
 * @format
 */

import 'react-native';
import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react-native'
import Button from '../src/components/Button';
import Gap from '../src/components/Gap';
import Post from '../src/screens/Post';
import { useNavigation } from '@react-navigation/native';
import Dashboard from '../src/screens/Dashboard';

const data = ['Item 1', 'Item 2', 'Item 3']

jest.mock('react-native-mmkv', () => ({
  MMKV: function () {

    const storage = new Map<string, string | boolean | number>()

    return {
        set: (key: string, value: string): void => {
            storage.set(key, value)
        },
        getString: (key: string): string | undefined => {
            const result = storage.get(key)
            if (typeof result === "string") return result
            else return undefined
        },
        getNumber: (key: string): number | undefined => {
            const result = storage.get(key)
            if (typeof result === "number") return result
            else return undefined
        },
        getBoolean: (key: string): boolean | undefined => {
            const result = storage.get(key)
            if (typeof result === "boolean") return result
            else return undefined
        },
        contains: (key: string): boolean => storage.has(key),
        delete: (key: string) => {
            storage.delete(key)
        },
        getAllKeys: () => storage.keys(),
        clearAll: () => storage.clear(),
        recrypt: () => {
            console.warn('Encryption is not supported in mocked MMKV instances!')
        },
        addOnValueChangedListener: () => {
            console.warn('Value-changed listeners are not supported in mocked MMKV instances!')
        }
    };
  }
}));

jest.mock('@react-navigation/native');

test('renders button correctly', async () => {
  const { getByText } = render(<Button title='button' onPress={jest.fn()} />)
  expect(getByText('button')).toBeTruthy();
});

test('renders gap correctly', async () => {
  const { getByTestId } = render(<Gap height={10} />)
  const viewGap = getByTestId('#myGap')
  expect(viewGap).toBeTruthy();
});

test('renders dashboard', async () => {
  const { getByText, queryByText, getByTestId } = render(<Dashboard />);
  const listView = getByTestId('#myNotes')

  expect(listView).toBe([])
  // const { getString } = require('react-native-mmkv');

  // await waitFor(() => {
  //   // expect(getByText('Item 1')).toBeTruthy();
  //   // expect(getByText('Item 2')).toBeTruthy();
  //   // expect(getByText('Item 3')).toBeTruthy();
  // });

  // const btnDeleteFirst = getByText("x", { exact: false })
  // fireEvent.press(btnDeleteFirst);
  // await waitFor(() => {
  //   // Ensure Item 1 is removed
  //   expect(queryByText('Item 1')).toBeNull();

  //   // Ensure Item 3 is exists
  //   expect(getByText('Item 2')).toBeTruthy(); 
  //   expect(getByText('Item 3')).toBeTruthy();
  // });
});

test('renders post screen create success', async () => {
  const goBack = jest.fn();
  (useNavigation as jest.Mock).mockReturnValue({
    goBack,
  });
  
  const {getByTestId} = render(<Post />)
  const noteInput = getByTestId('#myInput');
  const btnSave = getByTestId('#myButton');

  fireEvent.changeText(noteInput, 'New Item');
  expect(noteInput.props.value).toBe('New Item');

  fireEvent.press(btnSave);
  fireEvent.changeText(noteInput, '');

  expect(noteInput.props.value).toBe('');
  expect(goBack).toHaveBeenCalledTimes(1);
});