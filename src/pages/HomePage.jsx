import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { List } from '../components/List';
import { ALL_COUNTRIES } from '../config';

export const HomePage = ({ countries, setCountries }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const navigate = useNavigate();

  const handlerSearch = (search, region) => {
    let data = [...countries];

    if (region) {
      data = data.filter((c) => c.region.includes(region));
    }

    if (search) {
      data = data.filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredCountries(data);
  };

  useEffect(() => {
    if (!countries.length) {
      axios.get(ALL_COUNTRIES).then(({ data }) => {
        setCountries(data);
        setFilteredCountries(data);
      });
    }
  }, []);

  return (
    <>
      <Controls onSearch={handlerSearch} />
      <List>
        {filteredCountries.map((c) => {
          const countryInfo = {
            img: c.flags.png,
            name: c.name.common,
            info: [
              {
                title: 'Population',
                description: c.population.toLocaleString(),
              },
              {
                title: 'Region',
                description: c.region,
              },
              {
                title: 'Capital',
                description: c.capital,
              },
            ],
          };
          return (
            <Card
              key={c.name.common}
              onClick={() => navigate(`/country/${c.name.common}`)}
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  );
};
