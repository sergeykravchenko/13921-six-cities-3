import * as React from "react";
import {City} from "../../types";

interface Props {
  cities: City[];
  activeCity: City;
  onCityClick: (city: City) => void;
}

const LocationsList: React.FC<Props> = (props: Props) => {
  const {cities, activeCity, onCityClick} = props;
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, i) => (
        <li key={i} className="locations__item">
          <a className={`locations__item-link tabs__item ${activeCity.name === city.name ? ` tabs__item--active` : ``}`}
            onClick={() => onCityClick(city)}
            href="#">
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(LocationsList);
