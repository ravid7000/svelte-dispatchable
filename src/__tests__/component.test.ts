/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/svelte'
import { get } from 'svelte/store'
import Component from '../test/Component.svelte';
import { counter } from '../test/counterStore';

describe('Integration with Svelte', () => {
  test('Should render component without breaking', () => {
    const { container } = render(Component)
    expect(container).toBeInstanceOf(HTMLBodyElement)
  })
  test('Should increment the counter', async () => {
    const { getByText } = render(Component)
    const button = getByText('+')
    await fireEvent.click(button)
    expect(get(counter)).toBe(1)
    expect(getByText('1')).toBeInTheDocument()
  })
  test('Should decrement the counter', async () => {
    const { getByText } = render(Component)
    const button = getByText('-')
    await fireEvent.click(button)
    expect(get(counter)).toBe(0)
    expect(getByText('0')).toBeInTheDocument()
  })
  test('Should not reset the counter', async () => {
    const { getByText } = render(Component)
    const button = getByText('reset')
    await fireEvent.click(button)
    expect(get(counter)).toBe(0)
    expect(getByText('0')).toBeInTheDocument()
  })
})