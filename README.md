# Speed Training GraphQL

## Avant propos

Pour bien démarrer ce speed training, vous devez avoir

- [Node](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation) ou un autre gestionnaire de paquet (yarn ou npm)

## Partie 1 - Mise en place du serveur

Nous allons mettre en place un serveur GraphQL (apollo mais pourquoi pas un autre si vous êtes joueur)

- Cloner le projet et installer les dépendances avec un `pnpm install`.
- Rendez-vous dans le dossier `packages/graphql-server`, et instanciez un nouveau `ApolloServer` dans le fichier `src/index.js`
- Créez un schéma dans un fichier `schema.js` avec les types suivant

```graphql
type Book {
  url: String
  name: String
  isbn: String
  authors: [String]
  numberOfPages: Int
  publisher: String
  country: String
  mediaType: String
  released: String
  characters: [Character]
  povCharacters: [Character]
}

type Character {
  url: String
  name: String
  gender: String
  culture: String
  born: String
  died: String
  titles: [String]
  aliases: [String]
  spouse: Character
  allegiances: [House]
  books: [Book]
  povBooks: [Book]
  tvSeries: [String]
  playedBy: [String]
}

type House {
  url: String
  name: String
  region: String
  coatOfArms: String
  words: String
  titles: [String]
  seats: [String]
  currentLord: Character
  heir: Character
  overlord: House
  founded: String
  founder: Character
  diedOut: String
  ancestralWeapons: [String]
  cadetBranches: [House]
  swornMembers: [Character]
}
```

- Modifiez votre schéma pour ajouter des `Query`, afin de pouvoir récupérer :

  - la liste de tous les livres
  - un livre en fonction de son id
  - un personnage en fonction de son id
  - une maison en fonction de son id

- Implémentez maintenant le serveur graphql à l'aide d'un fichier `resolver` en utilisant l'API [https://anapioficeandfire.com/](https://anapioficeandfire.com/) et en vous aidant de la [documentation](https://www.apollographql.com/docs/apollo-server/data/resolvers/)

  - Dans un premier temps, ne vous occupez pas des nested values

- Utilisez un cache Redis pour éviter d'atteindre le rating limit

```sh
docker run --name redis-got -p 6379:6379 -d redis
```

## Partie 2 - Nested queries

- Créez la query dans l'éditeur afin de pouvoir récupérer les besoins suivant, et implémentez le resolver
  - récupérez les noms des personnages du livre #1
  - récupérez les noms des personnages que l'on suit (POV) dans le livre #1
  - récupérez le nom de l'époux/épouse du personnage #339
  - récupérez le nom des maisons de l'allegance du personnage #339
  - récupérez les noms des livres dans lequel le personnage #339 apparait et aussi en POV
  - récupérez le nom du seigneur actuel, de l'héritier, du fondateur et des membres de la maison #17
  - récupérez les branches cadettes

Et enfin pour être sûr,

- récupérez le nom des maisons des personnages en POV qui apparaissent dans les livres où l'épouse de Ned Stark (#339) est en POV.

- Modifiez le schéma pour ajouter l'id à vos Books, Characters et Houses à partir de leur URL

```javascript
const getIdFromUrl = (url) => {
  const urlStatements = url.split('/');
  return urlStatements[urlStatements.length - 1];
};
```

## Partie 3 - Mutations

Vous avez à disposition un server REST dans le dossier `favorite-server`.

Il va permettre d'ajouter une notion de favoris à nos livres, personnage et maison.

Il expose l'API suivante

```
POST /favorite --body { url: 'https://anapioficeandfire.com/api/characters/583' } --header {Authorization: <your-name-here>}
POST /favorite --body { url: 'https://anapioficeandfire.com/api/characters/583', delete: true } --header {Authorization: <your-name-here>}
GET /favorite
GET /favorite?url=https://anapioficeandfire.com/api/characters/583
```

Démarrer ce serveur en utilisant

```
pnpm install
pnpm start
```

Nous allons maintenant ajouter le logique pour ajouter un favori.

Ajoutez une mutation dans notre schéma pour ajouter un favori en utilisant le server ci-dessus.

- Modifiez le schéma graphql pour ajouter une mutation `addFavorite` qui aura un paramètre `url` et qui retournera un booléen (true si succès false sinon)
- Ajoutez une nouvelle datasource `favoriteAPI` qui va permettre de consommer le serveur ci-dessus
- Injectez votre nom dans le contexte serveur dans un attribut `token`, en vous basant sur un header qui sera fourni lors que la requête graphql (utiliser le header `Authorization`)

> Pour passer un header à toutes les requêtes d'un RESTDataSource, vous pouvez étendre la méthode willSendRequest
>
> ```js
> willSendRequest(request) {
>    if (this.context.token) {
>      request.headers.set('Authorization', this.context.token);
>    }
> }
> ```

- Modifiez le schéma graphql pour ajouter une mutation `removeFavorite` qui aura un paramètre `url` et qui retournera un booléen (true si succès false sinon)
- Modifiez le schéma graphql pour ajouter un attribut `numberOfFavorites` dans les types Book, House et Character, puis implémenter cette fonctionnalité.
- Modifiez le schéma graphql pour ajouter un attribut `isFavorite` dans les types Book, House et Character, puis implémenter cette fonctionnalité qui se basera sur l'attribut `token` du context.

> Pour désactiver la mise en cache pour une requête particulière, il est possible de spécifier des `cacheOptions` particulières :
>
> ```js
> return this.get(`resources/${id}`, null, { cacheOptions: { ttl: 0 }}
> ```

## Partie 4 - Client JS

Dans cette partie, nous allons utiliser apollo-graphql-client, un client JS graphql plutôt populaire (également disponible pour Android et iOS).
Pour cela, laissez vos serveurs démarrés et rendez-vous dans le dossier `graphql-client` et lancez la commande suivante :

```
pnpm dev
```

- Dans le fichier `appollo.js`, configurez votre client apollo avec l'uri de votre serveur et utilisez un cache de type `InMemoryCache`
- Allez dans le fichier `src/section/Books.jsx`, et ajoutez une query permettant de récupérer l'id, l'url et le nom d'un livre.
- Allez dans le fichier `src/section/Book.jsx`, et ajoutez une query paramétrée avec un id, permettant de récupérer l'id, l'url et le nom du livre ainsi que l'id, l'url et le nom des personnages présent dans le livre.
- Allez dans le fichier `src/section/House.jsx`, et ajoutez une query paramétrée avec un id, permettant de récupérer l'id, l'url et le nom d'une maison ainsi que l'id, l'url et le nom de ses membres.
- Allez dans le fichier `src/section/Character.jsx`, et ajoutez une query paramétrée avec un id, permettant de récupérer l'id, l'url et le nom d'un personnage ainsi que l'id, l'url et le nom de ses livres et de ses allégeances.

Nous allons utiliser un fragment pour éviter la duplication d'id, d'url et de nom.

- Pour cela ajoutez une interface `Item` dans votre schéma et faire implémenter cette interface par les types `House`, `Character` et `Book`
- Créez un fragment `GetItemInfo` dans un nouveau fichier `fragment.js` sur l'interface `Item` et utiliser ce fragment pour récupérer l'id, l'url et le nom dans toutes les query et nested query précédentes.
  > ⚠️ Il est nécessaire d'informer le cache de ce polymorphisme. Pour cela ajouter cette option dans le constructeur de votre InMemoryCache
  >
  > ```
  > possibleTypes: {
  >   Item: ["Book", "Character", "House"],
  > }
  > ```

## Partie 5 - Client JS mutations

Nous allons à présent gérer les mutations.

- Modifiez votre schéma pour ajouter également les champs `isFavorite` et `getFavorite` dans l'interface `Item`
- Modifiez votre fragment en conséquence. Vous devriez voir les notes s'afficher.
- Implémentez les mutations `addToFavorite` et `removeFromFavorite` et utiliser l'option `refetchQueries` pour mettre à jour vos données
  > Pour ajouter le header d'authorization, il faut modifier le client apollo avec l'utilisation d'un HttpLink
  >
  > ```
  > link: new HttpLink({
  >    uri: 'http://localhost:4000',
  >    headers: {
  >    },
  > }),
  > ```

## Bonus 1 (⚠️ très long)

- Créer une pagination sur les personnages des livres sur votre serveur.
- Créer la pagination côté client avec la gestion du cache et l'usage d'un bouton.

## Bonus 2

- Utiliser un poll, pour mettre à jour automatiquement le nombre de favoris

## Bonus 2 bis (⚠️ très long)

- Convertir votre serveur pour qu'il puisse supporter les `subscription` en suivant [la doc](https://www.apollographql.com/docs/apollo-server/data/subscriptions/#enabling-subscriptions)
- Modifier votre schéma pour créer une subscription `favoritesUpdated` et implémenter la fonctionnalité en émettant un évènement sur les mutations `addFavorite` et `removeFavorite`
- Supprimer la fonctionnalité de poll du Bonus 2, et ajouter une `subscription` sur votre client React.
