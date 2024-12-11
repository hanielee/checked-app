import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Container from '..//app/components/Container';  

describe('Container Component', () => {
  it('should render children passed to it', () => {
    render(
      <Container>
        <p data-testid="child-element">Test Child</p>
      </Container>
    );

    const childElement = screen.getByTestId('child-element');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Child');
  });

  it('should apply the correct container styles', () => {
    render(
      <Container>
        <p>Test Child</p>
      </Container>
    );

    const containerElement = screen.getByTestId('container');
    expect(containerElement).toHaveClass(
      'max-w-[2520px] mx-auto xl:px-20 md:px-10 sm: px-2 px-4'
    );
  });
});
