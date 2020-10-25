import { AxiosRequestConfig } from 'axios';
import useAxios, { Options } from 'axios-hooks';
import { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import { IUser } from '../types/user';

export const baseURL = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves';
const defaultConfig: Pick<AxiosRequestConfig, 'method'> = {
  method: 'GET',
};
const useAxiosClient = <T = any>(config: AxiosRequestConfig = defaultConfig, options: Options) => {
  const [user] = useStore<IUser>('user');
  const [, setLoadingState] = useStore<Boolean>('loading');

  const headers = {
    Authorization: `Bearer ${user.token}`,
    'Content-Type': config.method === 'POST' ? 'application/json' : undefined,
  };

  const queryOpts = useAxios<T>(
    {
      ...defaultConfig,
      ...config,
      headers,
      baseURL,
    },
    options
  );

  useEffect(() => {
    setLoadingState(queryOpts[0].loading);
  }, [queryOpts[0].loading]);

  return queryOpts;
};

export default useAxiosClient;
