import { useParams } from 'react-router-dom';
import { DisplayItem, DisplayItemList } from '../components/DisplayItem';

export const Character = () => {
  let { id } = useParams();
  const { loading, data } = { loading: true, data: null }; // TODO query

  const addToFavorite = () => {}; // TODO mutation
  const removeFromFavorite = () => {}; // TODO mutation

  return (
    <section>
      <h2>
        Character#{id} {loading ? null : `: ${data.character.name}`}
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DisplayItem
          title={data.character.name}
          isFavorite={data.character.isFavorite}
          nbOfFavorites={data.character.numberOfFavorites}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
        >
          <DisplayItemList
            summary="Books"
            list={data.character.books.map((it) => ({ id: it.id, name: it.name, url: `/books/${it.id}` }))}
          />
          <DisplayItemList
            summary="Allegiances"
            list={data.character.allegiances.map((it) => ({ id: it.id, name: it.name, url: `/houses/${it.id}` }))}
          />
        </DisplayItem>
      )}
    </section>
  );
};
