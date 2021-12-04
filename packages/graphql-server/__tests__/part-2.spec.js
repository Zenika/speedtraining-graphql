import { gql } from 'apollo-server';
import { reqGql } from './utils';

describe('Partie 2', () => {
  describe('book', () => {
    it('should get the main characters of a book', async () => {
      const query = {
        query: gql`
          query get_book_characters {
            book(id: 1) {
              characters {
                name
              }
            }
          }
        `,
      };

      const result = await reqGql(query);
      const book = result.data.book;

      expect(book.characters).toHaveLength(434);
      book.characters.forEach((character) => {
        expect(character.name).not.toHaveLength(0);
      });
    });

    it('should get the pov characters of a book', async () => {
      const query = {
        query: gql`
          query get_book_characters {
            book(id: 1) {
              povCharacters {
                name
              }
            }
          }
        `,
      };

      const result = await reqGql(query);
      const book = result.data.book;

      expect(book.povCharacters).toHaveLength(9);
      book.povCharacters.forEach((character) => {
        expect(character.name).not.toHaveLength(0);
      });
    });
  });
  describe('character', () => {
    it('should get the character spouse', async () => {
      const query = {
        query: gql`
          query get_characters_spouse {
            character(id: 339) {
              spouse {
                name
              }
            }
          }
        `,
      };

      const result = await reqGql(query);
      const character = result.data.character;

      expect(character.spouse.name).toEqual('Catelyn Stark');
    });

    it('should get the house of a character', async () => {
      const query = {
        query: gql`
          query get_characters_parents {
            character(id: 339) {
              allegiances {
                name
              }
            }
          }
        `,
      };

      const result = await reqGql(query);
      const character = result.data.character;

      expect(character.allegiances.map((it) => it.name)).toEqual(['House Stark of Winterfell']);
    });

    it('should get the book of a characters', async () => {
      const query = {
        query: gql`
          query get_characters_parents {
            character(id: 339) {
              books {
                name
              }
              povBooks {
                name
              }
            }
          }
        `,
      };

      const result = await reqGql(query);
      const character = result.data.character;

      expect(character.books.map((it) => it.name)).toEqual([
        'A Clash of Kings',
        'A Storm of Swords',
        'A Feast for Crows',
        'A Dance with Dragons',
        'The World of Ice and Fire',
      ]);
      expect(character.povBooks.map((it) => it.name)).toEqual(['A Game of Thrones']);
    });
  });
  describe('house', () => {
    it('should get the current lord a house of a characters', async () => {
      const query = {
        query: gql`
          query get_lord {
            house(id: 17) {
              currentLord {
                name
              }
              heir {
                name
              }
              founder {
                name
              }
              swornMembers {
                name
              }
            }
          }
        `,
      };

      const result = await reqGql(query);
      const house = result.data.house;

      expect(house.currentLord.name).toEqual('Tommen Baratheon');
      expect(house.heir.name).toEqual('Myrcella Baratheon');
      expect(house.founder.name).toEqual('Orys Baratheon');
      expect(house.swornMembers.map((it) => it.name)).toEqual([
        'Alyssa Velaryon',
        'Argella Durrandon',
        'Brienne of Tarth',
        'Cassana Estermont',
        'Colen of Greenpools',
        'Donal Noye',
        'Gowen Baratheon',
        'Lyonel Baratheon',
        'Ormund Baratheon',
        'Orys Baratheon',
        'Renly Baratheon',
        'Rhaelle Targaryen',
        'Steffon Baratheon',
        'Tya Lannister',
        'Barra',
        'Brella',
        'Edric Storm',
        'Harbert',
        'Jommy',
      ]);
    });
    it('should get the cadet branches', async () => {
      const query = {
        query: gql`
          query get_lord {
            house(id: 17) {
              cadetBranches {
                name
              }
            }
          }
        `,
      };

      const result = await reqGql(query);
      const house = result.data.house;

      expect(house.cadetBranches.map((it) => it.name)).toEqual([
        'House Baratheon of Dragonstone',
        "House Baratheon of King's Landing",
        'House Bolling',
        'House Wensington',
      ]);
    });
    it('should get the name of the house of the book where the wife of Ned stark appears as pov character', async () => {
      const query = {
        query: gql`
          query get_lord {
            character(id: 339) {
              spouse {
                povBooks {
                  povCharacters {
                    name
                    allegiances {
                      name
                    }
                  }
                }
              }
            }
          }
        `,
      };

      const result = await reqGql(query);
      const houses = result.data.character.spouse.povBooks
        .map((book) => book.povCharacters.map((char) => char.allegiances.map((it) => it.name)))
        .flat(Infinity);

      expect(houses).toEqual([
        'House Stark of Winterfell',
        'House Stark of Winterfell',
        'House Stark of Winterfell',
        'House Tully of Riverrun',
        'House Stark of Winterfell',
        'House Stark of Winterfell',
        'House Baelish of Harrenhal',
        'House Stark of Winterfell',
        'House Lannister of Casterly Rock',
        "House Targaryen of King's Landing",
        'House Stark of Winterfell',
        'House Stark of Winterfell',
        'House Stark of Winterfell',
        'House Tully of Riverrun',
        'House Stark of Winterfell',
        'House Baelish of Harrenhal',
        'House Stark of Winterfell',
        'House Greyjoy of Pyke',
        'House Lannister of Casterly Rock',
        "House Targaryen of King's Landing",
        'House Baratheon of Dragonstone',
        'House Seaworth of Cape Wrath',
        'House Stark of Winterfell',
        'House Stark of Winterfell',
        'House Stark of Winterfell',
        'House Tully of Riverrun',
        'House Lannister of Casterly Rock',
        'House Stark of Winterfell',
        'House Frey of the Crossing',
        'House Tarly of Horn Hill',
        'House Baelish of Harrenhal',
        'House Stark of Winterfell',
        'House Lannister of Casterly Rock',
        "House Targaryen of King's Landing",
        'House Baratheon of Dragonstone',
        'House Seaworth of Cape Wrath',
      ]);
    });
  });
});
