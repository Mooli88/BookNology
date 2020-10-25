import React, { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import useAxiosClient from '../../hooks/useAxiosClient';
import { IBookShelves } from '../../types/library';
import { IUser } from '../../types/user';
import Filter from '../Filter/Filter';
import Loading from '../Loading/Loading';
import Menu from '../Menu/Menu';
import Shelves from '../Shelves/Shelves';
import Sidebar from '../Sidebar/Sidebar';

const HAVE_READ_SHELVE = '4';

const MyLibrary = () => {
  const [user] = useStore<IUser>('user');
  const [shelves, setShelves] = useStore<IBookShelves[]>('shelves');
  const [{ data: shelvesData, loading: shelvesLoading, error: shelvesError }, getShelves] = useAxiosClient(undefined, {
    manual: true,
  });

  useEffect(() => {
    if (shelvesData && !shelvesError) {
      const _shelves = shelvesData.items.filter(({ id }: IBookShelves) => id !== 9);
      setShelves(_shelves);
    }
  }, [shelvesData]);

  useEffect(() => {
    if (user.token) getShelves();
  }, [user.token]);

  if (!user.token) return null;

  return (
    <div>
      <Sidebar
        renderMenu={() => (
          <Menu items={shelves.map(({ id, title: label }) => ({ id, label }))} defaultItemId={HAVE_READ_SHELVE} />
        )}>
        <>
          <Loading isLoading={shelvesLoading}>
            <div style={{ textAlign: 'center' }}>
              <Filter />
              <Shelves />
            </div>
          </Loading>
        </>
      </Sidebar>
    </div>
  );
};

export default MyLibrary;
