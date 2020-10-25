import React from 'react';
import { useStore } from 'react-hookstore';
import style from './Loading.module.css';

interface Props {
  isLoading?: Boolean;
}

const Loading: React.FC<Props> = ({ isLoading, children }) => {
  const [loadingState] = useStore<boolean>('loading');
  const isActive = isLoading || loadingState;
  return <div className={`${style.root} ${isActive && style.active}`}>{children}</div>;
};

export default Loading;
