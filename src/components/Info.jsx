import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { filterByCode } from '../config';

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;

const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
`;

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  line-height: 1.8;

  & > b {
    font-weight: var(--fw-bold);
  }
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--colors-bg);
  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`;

export const Info = (props) => {
  const navigate = useNavigate();

  const {
    name,
    flags,
    capital,
    population,
    subregion,
    region,
    tld,
    currencies,
    languages,
    borders,
  } = props;

  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    if (borders) {
      axios
        .get(filterByCode(Object.values(borders)))
        .then(({ data }) => setNeighbors(data.map((c) => c.name.common)));
    }
  }, [borders]);

  return (
    <Wrapper>
      <InfoImage src={flags.png} alt={name} />
      <div>
        <InfoTitle />
        <ListGroup>
          <List>
            {name.nativeName ? (
              <ListItem>
                <b>Native Name:</b>{' '}
                {Object.entries(name.nativeName).map(([_, n]) => (
                  <span key={n.common}>{n.common} </span>
                ))}
              </ListItem>
            ) : null}
            <ListItem>
              <b>Population:</b> {population ? population : "Don't have information"}
            </ListItem>
            <ListItem>
              <b>Region:</b> {region ? region : "Don't have information"}
            </ListItem>
            <ListItem>
              <b>Sub region:</b> {subregion ? subregion : "Don't have information"}
            </ListItem>
            <ListItem>
              <b>Capital:</b> {capital ? capital : "Don't have information"}
            </ListItem>
          </List>
          <List>
            <ListItem>
              <b>Top Level Domain:</b> {tld[0]}
            </ListItem>
            {currencies ? (
              <ListItem>
                <b>Currencies:</b>{' '}
                {Object.entries(currencies).map(([_, c]) => (
                  <span key={c.code}>{c.name} </span>
                ))}
              </ListItem>
            ) : null}
            {languages ? (
              <ListItem>
                <b>Languages:</b>{' '}
                {Object.entries(languages).map(([_, l]) => (
                  <span key={l}>{l} </span>
                ))}
              </ListItem>
            ) : null}
          </List>
        </ListGroup>
        <Meta>
          <b>Border Countries:</b>
          {borders ? (
            <TagGroup>
              {neighbors.map((n) => (
                <Tag key={n} onClick={() => navigate(`/country/${n}`)}>
                  {' '}
                  {n}
                </Tag>
              ))}
            </TagGroup>
          ) : (
            <span> There aren't border countries</span>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};
