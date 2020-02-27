import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 40]
});

export default class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.zoom = 12;
    this._map = null;
    this._mapRef = createRef();
  }

  _createMap() {
    this._layerGroup = leaflet.layerGroup().addTo(this._map);

    this.props.offers.map((item) => {
      leaflet
      .marker(item.coords, {icon: ICON})
      .addTo(this._layerGroup);
    });
  }

  componentDidMount() {
    const {activeCity} = this.props;
    const city = activeCity.coords;
    this._map = leaflet.map(this._mapRef.current, {
      center: city,
      zoom: this.zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView(city, this.zoom);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);
    this._createMap();
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeCity !== prevProps.activeCity) {
      this._layerGroup.clearLayers();
      this._map.setView(this.props.activeCity.coords, this.zoom);
      this._createMap();
    }
  }

  componentWillUnmount() {
    this._map.remove();
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
