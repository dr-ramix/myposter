// components/Cards.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Cards from './Cards';

// Mock data matching the API specification
const mockApiResponse = {
  message: {
    status: "success",
    code: "frontend-exercise data fetched",
    text: "successfully fetched frontend-exercise data"
  },
  payload: {
    data: [
      {
        id: 1,
        author: "Author A",
        title: "Post Title 1",
        dateAdded: "2023-01-01",
        images: {
          portrait: ["https://picsum.photos/900/1600"],
          landscape: ["https://picsum.photos/1600/900"]
        },
        likes: 10
      },
      {
        id: 2,
        author: "Author B",
        title: "Post Title 2",
        dateAdded: "2024-01-01",
        images: {
          portrait: ["https://picsum.photos/900/1600"],
          landscape: ["https://picsum.photos/1600/900"]
        },
        likes: 5
      }
    ]
  }
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Cards Component', () => {
  test('renders loading state initially', () => {
    render(<Cards searchTerm="" sortOption="" filterCurrentYear={false} />);
    expect(screen.getByText('Loading cards...')).toBeInTheDocument();
  });

  test('renders error message when fetch fails', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );
    render(<Cards searchTerm="" sortOption="" filterCurrentYear={false} />);
    
    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/)).toBeInTheDocument();
    });
  });

  test('renders cards after successful fetch with correct data', async () => {
    render(<Cards searchTerm="" sortOption="" filterCurrentYear={false} />);
    
    await waitFor(() => {
      expect(screen.getByText('Post Title 1')).toBeInTheDocument();
      expect(screen.getByText('Author A')).toBeInTheDocument();
      expect(screen.getByText('Post Title 2')).toBeInTheDocument();
      expect(screen.getByText('Author B')).toBeInTheDocument();
    });
  });

  test('filters by search term (author or title)', async () => {
    // Test author search
    const { rerender } = render(<Cards searchTerm="Author A" sortOption="" filterCurrentYear={false} />);
    await waitFor(() => {
      expect(screen.getByText('Post Title 1')).toBeInTheDocument();
      expect(screen.queryByText('Post Title 2')).not.toBeInTheDocument();
    });

    // Test title search
    rerender(<Cards searchTerm="Title 2" sortOption="" filterCurrentYear={false} />);
    await waitFor(() => {
      expect(screen.getByText('Post Title 2')).toBeInTheDocument();
      expect(screen.queryByText('Post Title 1')).not.toBeInTheDocument();
    });
  });




  test('shows no results message when no cards match filters', async () => {
    render(<Cards searchTerm="Non-existent term" sortOption="" filterCurrentYear={false} />);
    
    await waitFor(() => {
      expect(screen.getByText('No cards found matching your criteria.')).toBeInTheDocument();
    });
  });

  test('handles empty data response gracefully', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          message: { status: "success", code: "empty", text: "no data" },
          payload: { data: [] }
        }),
      })
    );
    
    render(<Cards searchTerm="" sortOption="" filterCurrentYear={false} />);
    
    await waitFor(() => {
      expect(screen.getByText('No cards found matching your criteria.')).toBeInTheDocument();
    });
  });
});