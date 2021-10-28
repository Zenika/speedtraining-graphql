import './DisplayItem.css';
import { Link } from 'react-router-dom';
import { Star } from './icons';

export const DisplayItemList = ({ summary = 'Display list', list }) => {
  if (!list.length) {
    return null;
  }

  return (
    <details>
      <summary>{summary}</summary>
      <ul className="item-list">
        {list.length
          ? list.map((item) => (
              <li key={item.id}>
                <Link to={item.url}>{item.name || '_'}</Link>
              </li>
            ))
          : null}
      </ul>
    </details>
  );
};

export const DisplayItem = ({ title, children, nbOfFavorites, isFavorite, addToFavorite, removeFromFavorite, url }) => {
  const displayFavorite = typeof nbOfFavorites === 'number';

  const handleClick = ($event) => {
    $event.preventDefault();
    if (addToFavorite && !isFavorite) {
      return addToFavorite();
    }
    if (removeFromFavorite && isFavorite) {
      return removeFromFavorite();
    }
  };

  return (
    <article className="item-article">
      {url ? (
        <h3>
          <Link to={url}>{title}</Link>
        </h3>
      ) : (
        <h3>{title}</h3>
      )}
      {children}
      {displayFavorite ? (
        <button className="favorite-button" onClick={handleClick}>
          <Star width={50} height={50} filled={isFavorite} />
          <span>{nbOfFavorites}</span>
        </button>
      ) : null}
    </article>
  );
};
