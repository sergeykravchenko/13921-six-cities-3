export default class ModelComment {
  constructor(data) {
    this.id = data[`id`];
    this.rating = data[`rating`];
    this.comment = data[`comment`];
    this.date = new Date(data[`date`]);
    this.user = {
      name: data[`user`][`name`],
      avatar: data[`user`][`avatar_url`],
    };
  }

  static parseComment(data) {
    return new ModelComment(data);
  }

  static parseComments(data) {
    return data.map(ModelComment.parseComment);
  }
}
