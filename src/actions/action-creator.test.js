import ActionCreator from './action-creator.js';
import ActionTypes from '../action-types/action-types.js';

const mockPromoCardData = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: 2014,
  posterImage: `the-grand-budapest-hotel-posterImage`,
};

const mockGenre = `Drama`;

const mockCardsData = [
  {
    id: 1,
    backgroundImage: `bg-the-grand-budapest-hotel`,
    posterImage: `the-grand-budapest-hotel-posterImage`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    title: `Bohemian Rhapsody`,
    description: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
    ],
    rating: `10`,
    scoresCount: 100,
    previewVideoSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    director: `Steven Spielberg`,
    starring: [
      `Judi Dench`, `Robert De Niro`, `Leonardo DiCaprio`, `Morgan Freeman`, `Tom Hanks`,
    ],
    runtime: `1h 58m`,
    genre: `Drama`,
    released: 1989,
    reviewsId: [5, 6, 7, 8],
  },
];

describe(`Action creators work correctly`, () => {
  it(`Action creator for update cards returns correct action`, () => {
    expect(ActionCreator.cardsLoaded(mockCardsData)).toEqual({type: ActionTypes.CARDS_LOADED, payload: mockCardsData});
  });

  it(`Action creator for update promo card data returns correct action`, () => {
    expect(ActionCreator.promoCardLoaded(mockPromoCardData)).toEqual({type: ActionTypes.PROMO_CARD_LOADED, payload: mockPromoCardData});
  });

  it(`Action creator for change genre returns correct action`, () => {
    expect(ActionCreator.changeGenre(mockGenre)).toEqual({type: ActionTypes.CHANGE_GENRE, payload: mockGenre});
  });

  it(`Action creator for change filtered cards length returns correct action`, () => {
    expect(ActionCreator.changeFilteredCardsLength(10)).toEqual({type: ActionTypes.CHANGE_FILTERED_CARDS_LENGTH, payload: 10});
  });

  it(`Action creator for change showing cards amount returns correct action`, () => {
    expect(ActionCreator.changeShowingCardsAmount(8)).toEqual({type: ActionTypes.CHANGE_SHOWING_CARDS_AMOUNT, payload: 8});
  });

  it(`Action creator for change showing cards amount returns correct action`, () => {
    expect(ActionCreator.changeShowingCardsAmount(undefined)).toEqual({type: ActionTypes.CHANGE_SHOWING_CARDS_AMOUNT, payload: undefined});
  });
});
