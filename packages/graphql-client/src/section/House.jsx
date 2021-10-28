import { useParams } from 'react-router-dom';
import { DisplayItem, DisplayItemList } from '../components/DisplayItem';

export const House = () => {
  let { id } = useParams();
  const loading = true; // TODO query
  const data = null; // TODO query

  const addToFavorite = () => {}; // TODO mutation
  const removeFromFavorite = () => {}; // TODO mutation

  return (
    <section>
      <h2>
        House#{id} {loading ? null : `: ${data.house.name}`}
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DisplayItem
          title={data.house.name}
          isFavorite={data.house.isFavorite}
          nbOfFavorites={data.house.numberOfFavorites}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
        >
          <DisplayItemList
            summary="House"
            list={data.house.swornMembers.map((it) => ({ id: it.id, name: it.name, url: `/characters/${it.id}` }))}
          />
        </DisplayItem>
      )}
    </section>
  );
};
