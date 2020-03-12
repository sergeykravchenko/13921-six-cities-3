import React from 'react';
import PropTypes from 'prop-types';

const LocationsList = (props) => {
  const {cities, activeCity, handleCityClick} = props;
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, i) => (
        <li key={i} className="locations__item">
          <a className={`locations__item-link tabs__item ${activeCity.name === city.name ? ` tabs__item--active` : ``}`}
            onClick={() => handleCityClick(city)}
            href="#">
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

LocationsList.propTypes = {
  cities: PropTypes.array,
  activeCity: PropTypes.object,
  handleCityClick: PropTypes.func,
};

export default LocationsList;
