import { encode as encodeQuery } from 'qss';
import React, { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import useAxiosClient from '../../hooks/useAxiosClient';
import { SelecredShelvesAction } from '../../store/library';
import { IVolume, IVolumes } from '../../types/library';
import Emoji from '../Emoji/Emoji';
import styles from './Menu.module.css';

interface Item {
  id: string | number;
  label: string;
}

interface Props {
  items: Item[];
  defaultItemId: string;
}

const queryFilter = encodeQuery(
  {
    startIndex: 1,
    fields:
      'totalItems,items(id,volumeInfo(title,authors,publisher,publishedDate,description,subtitle,pageCount,categories,averageRating,ratingsCount,imageLinks,previewLink))',
  },
  '?q:'
);

const ShelveMenu = ({ items, defaultItemId }: Props) => {
  const [, getVolumes] = useAxiosClient<{
    totalItems: number;
    items: IVolume[];
  }>(
    { url: queryFilter },
    {
      manual: true,
    }
  );

  const [selectedShelves, dispatchSelectedShelves] = useStore<IVolumes, any>('selectedShelves');

  const getShelveVolumes = async (id: string) => {
    const { data } = await getVolumes({ url: `/${id}/volumes${queryFilter}` });
    const volumes = data && data.totalItems ? data.items! : [];
    return { id, volumes };
  };

  const onItemSelect = async (id: string) => {
    try {
      const payload = await getShelveVolumes(id);
      dispatchSelectedShelves({
        type: SelecredShelvesAction.SELECT_SHELVE,
        payload,
      });
    } catch (error) {
      console.log('onItemSelect -> error', error);
    }
  };

  const getEmoji = (id: string | number) => {
    const shelve = selectedShelves[id];

    if (shelve) {
      if (shelve.length) return <Emoji emoji='📗 ' label='book' />;
      return <Emoji emoji='🤷‍♂️ ' label='empty' />;
    }

    return '';
  };

  const renderItems = () =>
    items.map(({ id, label }) => (
      <li key={id} onClick={() => onItemSelect(id.toString())}>
        {getEmoji(id)}
        {label}
      </li>
    ));

  useEffect(() => {
    onItemSelect(defaultItemId);
  }, [defaultItemId]);

  return (
    <div className={styles.root}>
      <ul className={styles.items}>{renderItems()}</ul>
    </div>
  );
};

export default ShelveMenu;
