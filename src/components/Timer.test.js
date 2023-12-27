import React from 'react';
import { render } from '@testing-library/react';
import Timer from './Timer';

describe('Timer Component Tests', () => {

    test('renders with correct preset time', () => {
        const { getByText } = render(<Timer duration={120} timeElapsed={0} />);
        expect(getByText('02:00')).toBeInTheDocument();
    });

    test('shows correct time elapsed', () => {
        const { getByText, rerender } = render(<Timer duration={180} timeElapsed={0} />);
        expect(getByText('00:00')).toBeInTheDocument();

        // Simulate time elapsed
        rerender(<Timer duration={180} timeElapsed={30} />);
        expect(getByText('00:30')).toBeInTheDocument();

        rerender(<Timer duration={180} timeElapsed={60} />);
        expect(getByText('01:00')).toBeInTheDocument();
    });

    test('progress circle updates with time', () => {
        const { getByTestId } = render(<Timer duration={60} timeElapsed={15} />);
        const circle = getByTestId('progress-circle');
        expect(circle).toHaveAttribute('stroke-dashoffset', expect.any(String));
    });

});
