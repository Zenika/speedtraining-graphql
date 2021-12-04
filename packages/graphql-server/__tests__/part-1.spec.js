import { gql } from 'apollo-server';
import { reqGql } from './utils';
const BASE_URL = 'https://anapioficeandfire.com'

describe('Partie 1', () => {
  it('should get the list of books', async () => {
    const query = {
      query: gql`
        query get_books {
          books {
            url
            name
            isbn
            authors
            numberOfPages
            publisher
            country
            mediaType
            released
          }
        }
      `,
    };

    const result = await reqGql(query);
    const books = result.data.books;

    expect(books).toHaveLength(10);

    expect(books[0].url).toEqual(`${BASE_URL}/api/books/1`);
    expect(books[0].name).toEqual('A Game of Thrones');
    expect(books[0].isbn).toEqual('978-0553103540');
    expect(books[0].authors).toEqual(['George R. R. Martin']);
    expect(books[0].numberOfPages).toEqual(694);
    expect(books[0].publisher).toEqual('Bantam Books');
    expect(books[0].country).toEqual('United States');
    expect(books[0].mediaType).toEqual('Hardcover');
    expect(books[0].released).toEqual('1996-08-01T00:00:00');
  });

  it('should get a book', async () => {
    const query = {
      query: gql`
        query get_book {
          book(id: 2) {
            url
            name
            isbn
            authors
            numberOfPages
            publisher
            country
            mediaType
            released
          }
        }
      `,
    };

    const result = await reqGql(query);
    const book = result.data.book;

    expect(book.url).toEqual(`${BASE_URL}/api/books/2`);
    expect(book.name).toEqual('A Clash of Kings');
    expect(book.isbn).toEqual('978-0553108033');
    expect(book.authors).toEqual(['George R. R. Martin']);
    expect(book.numberOfPages).toEqual(768);
    expect(book.publisher).toEqual('Bantam Books');
    expect(book.country).toEqual('United States');
    expect(book.mediaType).toEqual('Hardback');
    expect(book.released).toEqual('1999-02-02T00:00:00');
  });

  it('should get a house', async () => {
    const query = {
      query: gql`
        query get_house {
          house(id: 378) {
            url
            name
            region
            coatOfArms
            words
            titles
            seats
            founded
            diedOut
            ancestralWeapons
          }
        }
      `,
    };

    const result = await reqGql(query);
    const house = result.data.house;

    expect(house.url).toEqual(`${BASE_URL}/api/houses/378`);
    expect(house.name).toEqual("House Targaryen of King's Landing");
    expect(house.region).toEqual('The Crownlands');
    expect(house.coatOfArms).toEqual('Sable, a dragon thrice-headed gules');
    expect(house.words).toEqual('Fire and Blood');
    expect(house.titles).toEqual([
      'King of the Andals, the Rhoynar and the First Men',
      'Lord of the Seven Kingdoms',
      'Prince of Summerhall',
    ]);
    expect(house.seats).toEqual(['Red Keep (formerly)', 'Summerhall (formerly)']);
    expect(house.founded).toEqual("House Targaryen: >114 BCHouse Targaryen of King's Landing:1 AC");
    expect(house.diedOut).toEqual('');
    expect(house.ancestralWeapons).toEqual(['Blackfyre', 'Dark Sister']);
  });

  it('should get a character', async () => {
    const query = {
      query: gql`
        query get_character {
          character(id: 583) {
            url
            name
            gender
            culture
            born
            died
            titles
            aliases
            tvSeries
            playedBy
          }
        }
      `,
    };

    const result = await reqGql(query);
    const character = result.data.character;

    expect(character.url).toEqual(`${BASE_URL}/api/characters/583`);
    expect(character.name).toEqual('Jon Snow');
    expect(character.gender).toEqual('Male');
    expect(character.culture).toEqual('Northmen');
    expect(character.born).toEqual('In 283 AC');
    expect(character.died).toEqual('');
    expect(character.titles).toEqual(["Lord Commander of the Night's Watch"]);
    expect(character.aliases).toEqual([
      'Lord Snow',
      "Ned Stark's Bastard",
      'The Snow of Winterfell',
      'The Crow-Come-Over',
      "The 998th Lord Commander of the Night's Watch",
      'The Bastard of Winterfell',
      'The Black Bastard of the Wall',
      'Lord Crow',
    ]);
    expect(character.tvSeries).toEqual(['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6']);
    expect(character.playedBy).toEqual(['Kit Harington']);
  });
});
