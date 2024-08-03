import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChatImageComponent } from '../../HomePage/ChatImageComponent';

describe('ChatImageComponent', () => {
  it('should render the chat container with the correct styles', () => {
    render(<ChatImageComponent />);

    const chatContainer = screen.getByTestId('chat-container');
    expect(chatContainer).toHaveStyle(`
        background: linear-gradient(180deg, var(--soft-violet2) 0%, var(--pure-blue) 100%);
        borderRadius: 24px;
        height: 48px;
        width: 48px;
        display: flex;
        alignItems: center;
        justifyContent: center;
      `);
  });

  it('should render the chat image with the correct styles', () => {
    render(<ChatImageComponent />);

    const chatImage = screen.getByTestId('chat-image');
    expect(chatImage).toHaveStyle(`
        backgroundImage: url(/assets/images/chat.svg);
        backgroundSize: 100% 100%;
        height: 24px;
        width: 23px;
      `);
  });
});
