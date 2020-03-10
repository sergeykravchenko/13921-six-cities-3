import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';
import offers from '../../mocks/offers';

const offer = {
  "id": 1,
  "name": `Canal View Prinsengracht`,
  "picture": `img/room.jpg`,
  "price": 120,
  "priceText": `night`,
  "rating": 4,
  "zoom": 16,
  "features": {
    "type": `Private room`,
    "bedrooms": 8,
    "maxGuests": 7,
  },
  "isPremium": true,
  "isInBookmark": true,
  "houseHolds": [
    `Wi-Fi`,
    `Washing machine`,
  ],
  "gallery": [
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
  ],
  "host": {
    "id": 2,
    "name": `Max`,
    "img": `img/avatar-max.jpg`,
    "isPro": true,
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  "closest": [
    {
      "coords": [52.3909553943508, 4.929309666406198],
    }, {
      "coords": [52.3909553943508, 4.929309666406197],
    }, {
      "coords": [52.3909553943508, 4.929309666406196],
    },
  ]
};

const activeCity = {
  "name": `Hamburg`,
  "coords": [52.38013, 4.9],
};

it(`Offer-card renders correctly`, () => {
  const tree = renderer
    .create(<OfferCard
      offer={offer}
      offers={offers}
      activeCity={activeCity}
      handlePlaceTitleClick={()=>{}}
    />, {
      createNodeMock: () => {
        return document.createElement(`div`);
      }})
    .toJSON();
  expect(tree).toMatchSnapshot();
});
