import { gql } from 'apollo-server';
import { reqGql } from './utils';

const headers = { Authorization: 'Zenika Person' };
const addFavoriteMutation = (url) => {
  const query = {
    query: gql`
        mutation addToFavorite {
            addFavorite(url: "${url}")
        }
    `,
  };

  return reqGql(query, headers);
};

const removeFavoriteMutation = (url) => {
  const query = {
    query: gql`
        mutation removeToFavorite {
            removeFavorite(url: "${url}")
        }
    `,
  };

  return reqGql(query, headers);
};

describe('Partie 3', () => {
  describe('book', () => {
    it('should add a book to favorite', async () => {
      await addFavoriteMutation('https://anapioficeandfire.com/api/books/8');
      const query = {
        query: gql`
          query get_book {
            book(id: 8) {
              numberOfFavorites
            }
          }
        `,
      };
      let response = await reqGql(query, headers);
      expect(response.data.book.numberOfFavorites).toEqual(1);

      await removeFavoriteMutation('https://anapioficeandfire.com/api/books/8');
      response = await reqGql(query, headers);
      expect(response.data.book.numberOfFavorites).toEqual(0);
    });
  });
  describe('character', () => {
    it('should add a character to favorite', async () => {
      await addFavoriteMutation('https://www.anapioficeandfire.com/api/characters/1');
      const query = {
        query: gql`
          query get_character {
            character(id: 1) {
              numberOfFavorites
            }
          }
        `,
      };
      let response = await reqGql(query, headers);
      console.log(response.data.character);
      expect(response.data.character.numberOfFavorites).toEqual(1);

      await removeFavoriteMutation('https://www.anapioficeandfire.com/api/characters/1');
      response = await reqGql(query, headers);
      expect(response.data.character.numberOfFavorites).toEqual(0);
    });
  });
  describe('house', () => {
    it('should add a house to favorite', async () => {
      await addFavoriteMutation('https://anapioficeandfire.com/api/houses/17');
      const query = {
        query: gql`
          query get_house {
            house(id: 17) {
              numberOfFavorites
            }
          }
        `,
      };
      let response = await reqGql(query, headers);
      expect(response.data.house.numberOfFavorites).toEqual(1);

      await removeFavoriteMutation('https://anapioficeandfire.com/api/houses/17');
      response = await reqGql(query, headers);
      expect(response.data.house.numberOfFavorites).toEqual(0);
    });
  });
});
