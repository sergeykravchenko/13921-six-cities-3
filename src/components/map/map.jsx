import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const ICON = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [30, 40]
});

const ACTIVE_ICON = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [30, 40]
});

export default class Map extends PureComponent {
  constructor(props) {
    super(props);
    this._map = null;
    this._mapRef = createRef();
  }

  _createMap(activeMarkerId) {
    if (this._layerGroup) {
      this._layerGroup.clearLayers();
    }

    this._layerGroup = leaflet.layerGroup().addTo(this._map);
    const offers = this.props.offers;

    offers.map((item) => {
      leaflet
      .marker(item.coords, {icon: activeMarkerId && activeMarkerId === item.id ? ACTIVE_ICON : ICON})
      .addTo(this._layerGroup);
    });
  }

  componentDidMount() {
    const {coords, zoom} = this.props;

    const center = coords;
    this._map = leaflet.map(this._mapRef.current, {
      center,
      zoom,
      zoomControl: false,
      marker: true
    });


    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);
    this._map.setView(center, zoom);
    this._createMap(this.props.activeMarker);
  }

  componentDidUpdate(prevProps) {
    if (this.props.offers !== prevProps.offers) {
      this._map.setView(this.props.coords, this.props.zoom);
      this._createMap(this.props.activeMarker);
    }

    if (this.props.activeMarker !== prevProps.activeMarker) {
      this._createMap(this.props.activeMarker);
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
  bemBlock: PropTypes.string,
  coords: PropTypes.arrayOf(PropTypes.number),
  activeMarker: PropTypes.number,
  offers: PropTypes.arrayOf(PropTypes.shape({
    coords: PropTypes.arrayOf(PropTypes.number)
  })),
  zoom: PropTypes.number,
};
