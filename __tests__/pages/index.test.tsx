import { render, screen, waitFor } from '@testing-library/react'

import App from 'pages/index'

describe('App', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({})
    })
  ) as any

  it('matches the snapshot', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen).toMatchSnapshot()
    })
  })
  it('shows the heading of the index page', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Leads' })).toBeInTheDocument()
  })
})
