import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const ZOOM_OPTION = 12;

export default class Map extends PureComponent {
  constructor(props) {
    super(props);
    this._map = null;
    this._mapRef = createRef();
  }

  _update() {
    const {offers, activeCity} = this.props;
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const city = activeCity.coords;
    this._map.setView(city, ZOOM_OPTION);

    offers.map((item) => {
      leaflet
      .marker(item.coords, {icon})
      .addTo(this._map);
    });
  }

  componentDidMount() {
    this._map = leaflet.map(this._mapRef.current, {
      zoom: ZOOM_OPTION,
      zoomControl: false,
      marker: true
    });

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);

    this._update();
  }

  componentDidUpdate() {
    this._update();
  }

  render() {
    const {bemBlock} = this.props;
    return (
      <section ref={this._mapRef} className={`${bemBlock}__map map`} />
    );
  }
}

Map.propTypes = {
  bemBlock: PropTypes.string.isRequired,
  activeCity: PropTypes.object.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    coords: PropTypes.arrayOf(PropTypes.number).isRequired
  })).isRequired
};
