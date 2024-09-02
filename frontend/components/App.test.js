import React from 'react'
import server from '../../backend/mock-server'
import { render, waitFor, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AppFunctional from './AppFunctional'

describe('App component', () => {
  beforeAll(() => { server.listen() })
  afterAll(() => { server.close() })
  // let userEmail, submitBtn
  // let user

  // beforeEach(() => {
  //   render(<AppFunctional />)
  //   // user = userEvent.setup()
  //   // userEmail = screen.getByPlaceholderText('type email')
  //   // submitBtn = screen.getByTestId('submit')
  // })

  // const mockForm = {
  //   x: 2,
  //   y: 2,
  //   steps: 0,
  //   email: 'lady@gaga.com'
  // }

  
  
  test('[1] Headers renders correctly to the DOM', () => {
    render(<AppFunctional />)
    expect(screen.getByText('Coordinates (2, 2)')).toBeVisible()
    expect(screen.getByText('You moved 0 times')).toBeVisible()
  })
  
  test('[2] Grid properly renders to the screen', () => {
    render(<AppFunctional />)
    expect(document.querySelector('#grid')).toBeVisible()
  })

  test('[3] Checking for an active square and the B', () => {
    render(<AppFunctional />)
    expect(document.querySelector('.active')).toBeVisible()
    expect(screen.getByText('B')).toBeVisible()
  })

  test('[4] All buttons render properly on the screen', () => {
    render(<AppFunctional />)
    expect(document.querySelector('#keypad')).toBeVisible()
    expect(document.querySelector('#left')).toBeVisible()
    expect(document.querySelector('#right')).toBeVisible()
    expect(document.querySelector('#down')).toBeVisible()
    expect(document.querySelector('#reset')).toBeVisible()
  })

  test('[5] Inputs render correctly', () => {
    render(<AppFunctional />)
    expect(screen.getByPlaceholderText('type email')).toBeVisible()
    expect(document.querySelector('#submit')).toBeVisible()
  })
})