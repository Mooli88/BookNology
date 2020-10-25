import React from 'react';

interface Props {
  emoji: string;
  label: string;
  className?: string;
}

const Emoji: React.FC<Props> = ({ emoji, label, className }) => {
  return (
    <span className={className} role='img' aria-label={label}>
      {emoji}
    </span>
  );
};

export default Emoji;
