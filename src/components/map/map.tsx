import * as React from "react";
import * as leaflet from "leaflet";
import {Offer} from "../../types";

interface Props {
  bemBlock: string;
  coords: number[];
  activeMarker: number;
  offers: Offer[];
  zoom: number;
}

const ICON = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [30, 40]
});

const ACTIVE_ICON = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [30, 40]
});

export default class Map extends React.PureComponent<Props, null> {
  private mapRef: React.RefObject<HTMLElement>
  private map: leaflet.map | null;
  private layerGroup: leaflet.LayerGroup;
  constructor(props) {
    super(props);
    this.map = null;
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const {coords, zoom} = this.props;

    const center = coords;
    this.map = leaflet.map(this.mapRef.current, {
      center,
      zoom,
      zoomControl: false,
      marker: true
    });


    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this.map);
    this.map.setView(center, zoom);
    this._createMap(this.props.activeMarker);
  }

  componentDidUpdate(prevProps) {
    if (this.props.offers !== prevProps.offers) {
      this.map.setView(this.props.coords, this.props.zoom);
      this._createMap(this.props.activeMarker);
    }

    if (this.props.activeMarker !== prevProps.activeMarker) {
      this._createMap(this.props.activeMarker);
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  _createMap(activeMarkerId) {
    if (this.layerGroup) {
      this.layerGroup.clearLayers();
    }

    this.layerGroup = leaflet.layerGroup().addTo(this.map);
    const offers = this.props.offers;

    offers.map((item) => {
      leaflet
      .marker(item.coords, {icon: activeMarkerId && activeMarkerId === item.id ? ACTIVE_ICON : ICON})
      .addTo(this.layerGroup);
    });
  }

  render() {
    const {bemBlock} = this.props;
    return (
      <section ref={this.mapRef} className={`${bemBlock}__map map`} />
    );
  }
}
