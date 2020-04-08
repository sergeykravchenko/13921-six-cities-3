export default class ModelOffer {
  constructor(data) {
    this.id = data[`id`];
    this.name = data[`title`];
    this.picture = data[`preview_image`];
    this.price = data[`price`];
    this.priceText = `night`;
    this.rating = data[`rating`];
    this.features = {
      type: data[`type`],
      bedrooms: data[`bedrooms`],
      maxGuests: data[`max_adults`]
    };
    this.isPremium = data[`is_premium`];
    this.isInBookmark = data[`is_favorite`];
    this.houseHolds = data[`goods`];
    this.images = data[`images`];
    this.host = {
      id: data[`host`][`id`],
      name: data[`host`][`name`],
      avatar: data[`host`][`avatar_url`],
      isPro: data[`host`][`is_pro`],
    };
    this.description = data[`description`];
    this.coords = [
      data[`location`][`latitude`],
      data[`location`][`longitude`]
    ];
    this.zoom = data[`location`][`zoom`];
    this.city = {
      name: data[`city`][`name`],
      coords: [
        data[`city`][`location`][`latitude`],
        data[`city`][`location`][`longitude`]
      ],
      zoom: data[`city`][`location`][`zoom`]
    };
  }

  static parseOffer(data) {
    return new ModelOffer(data);
  }

  static parseOffers(data) {
    return data.map(ModelOffer.parseOffer);
  }
}
