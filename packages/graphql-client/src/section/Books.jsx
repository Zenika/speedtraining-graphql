import { DisplayItem } from '../components/DisplayItem';

export const Books = () => {
  const loading = true; // TODO query
  const data = null; // TODO query

  const addToFavorite = () => {}; // TODO mutation
  const removeFromFavorite = () => {}; // TODO mutation

  return (
    <section>
      <h2>Books</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.books.map((book) => (
          <DisplayItem
            title={book.name}
            key={book.id}
            url={'/books/' + book.id}
            isFavorite={book.isFavorite}
            nbOfFavorites={book.numberOfFavorites}
            addToFavorite={() => addToFavorite({ variables: { url: book.url } })}
            removeFromFavorite={() => removeFromFavorite({ variables: { url: book.url } })}
          />
        ))
      )}
    </section>
  );
};
