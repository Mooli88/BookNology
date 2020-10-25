import { encode as encodeQuery } from 'qss';
import React, { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import useAxiosClient from '../../hooks/useAxiosClient';
import { IBookShelves, IVolume } from '../../types/library';
import styles from './BookGalary.module.css';

const queryFilter = encodeQuery(
  { startIndex: 1, fields: 'items(id,volumeInfo(authors,imageLinks,previewLink,description))' },
  '?q:'
);

const BookGalary = () => {
  const [shelves] = useStore<IBookShelves[]>('shelves');
  const [{ data: volumesData, loading: volumesLoading, error: voluemsErr }, getVolumes] = useAxiosClient<{
    totalItems: number;
    items: IVolume[];
  }>(undefined, {
    manual: true,
  });

  useEffect(() => {
    if (shelves) {
      const bookForYou = shelves.find(({ title }) => title === 'Books for you');
      if (bookForYou?.id) getVolumes({ url: `/${bookForYou.id}/volumes${queryFilter}` });
    }
  }, [shelves]);

  const renderBooks = () => {
    const books = volumesData?.items ?? [];
    const wideCardRandom = [0, 10, 18, 24];
    const tallCardRandom = [0, 1, 12, 16, 18];

    return books.map(({ id, volumeInfo }, i) => {
      const tallClass = tallCardRandom.includes(i) ? styles.cardTall : '';
      const wideClass = wideCardRandom.includes(i) ? styles.cardWide : '';
      const { authors, imageLinks, previewLink, description } = volumeInfo;
      return (
        <a
          href={previewLink}
          target='__blank'
          key={id}
          className={`${styles.card} ${tallClass} ${wideClass}`}
          style={{ backgroundImage: `url(${imageLinks.thumbnail})` }}>
          <div className={styles.info}>
            <p>{authors}</p>
            <p>{description}</p>
          </div>
        </a>
      );
    });
  };

  if (volumesLoading) return <h2>Loading...</h2>;
  if (!volumesData) return null;

  return <div className={styles.root}>{renderBooks()}</div>;
};

export default BookGalary;
