import { Fragment, useEffect, useState } from "react";
import femaleIcon from "../src/assets/leia-icon.png";
import maleIcon from "../src/assets/star-wars.png";
import noBinary from "../src/assets/ship.png";

interface Character {
  name: string;
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  homeworld: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  species: [];
  starships: string[];
  url: string;
  vehicles: string[];
}

interface swapiResults {
  count: number;
  next: string;
  previous: null;
  results: Character[];
}

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface ViewCharacterData {
  name: string;
  birth_year: string;
  homeworld: Planet;
  gender: string;
}

function CharactersTable() {
  const SWAPI_URL = "http://swapi.dev/api/people";
  const [swapiData, setSwapiData] = useState<ViewCharacterData[]>();
  //const [planet, setPlanet] = useState<swapiPlanet>
  const [character, setCharacter] = useState<ViewCharacterData>();
  const [nCharacter, setNcharacter] = useState<number>(1);
  const fetchingData = async () => {
    const response = await fetch(SWAPI_URL);
    const data: swapiResults = await response.json();
    //
    const swapiCharacters: ViewCharacterData[] = []
    data.results.map(async ( character: Character )=>{
      const planet: Planet = await fetchingPlanet(character.homeworld);
      const viewCharacterData = {
        name: character.name,
        birth_year: character.birth_year,
        homeworld: planet,
        gender: character.gender,
      }
      swapiCharacters.push(viewCharacterData)
    })

    //

    setSwapiData(swapiCharacters);
  };
  
  const fetchingCharacter = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
    const response = await fetch(SWAPI_URL + "/" + nCharacter);
    const data: Character = await response.json();

    const planet: Planet = await fetchingPlanet(data.homeworld);
    const viewCharacterData = {
      name: data.name,
      birth_year: data.birth_year,
      homeworld: planet,
      gender: data.gender,
    };
    debugger
    if(data && planet){
      setCharacter(viewCharacterData);
    }
    
  };

  const fetchingPlanet = async (planet_url: string) => {
    debugger
    const response = await fetch(planet_url);
    const data = await response.json();
    return data;
  };

  const GoNext = () => {
    if (swapiData != undefined && swapiData.length != undefined) {
      if (nCharacter + 1 <= swapiData.length) {
        setNcharacter((nCharacter) => nCharacter + 1);
      } else {
        setNcharacter(1);
      }
    }
  };

  const goPrevious = () => {
    if (swapiData != undefined && swapiData.length != undefined) {
      if (nCharacter - 1 >= 1) {
        setNcharacter((nCharacter) => nCharacter - 1);
      } else {
        setNcharacter(swapiData.length);
      }
    }
  };

  const goLast = () => {
    if (swapiData?.length != undefined && swapiData.length != undefined) {
      setNcharacter(swapiData.length);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  useEffect(() => {
    fetchingCharacter();
  }, [nCharacter]);

  return (
    <Fragment>
      {swapiData ? (
        <Fragment>
          <table className="Table">
            <tr>
              <th>Name</th>
              <th>Bird year</th>
              <th>Homeworld</th>
              <th>Gender</th>
            </tr>
            <tbody>
              {swapiData?.map((result, i) => {
                return (
                  <tr key={i}>
                    <td>{result.name}</td>
                    <td>{result.birth_year}</td>
                    <td>{result.homeworld.name}</td>
                    <td>{result.gender}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="Container">
            <img
              src={
                character?.gender === "female"
                  ? femaleIcon
                  : character?.gender === "male"
                  ? maleIcon
                  : noBinary
              }
              width="50px"
              className="Image"
            />
            <table className="Table">
              <tr>
                <th>Name</th>
                <th>Bird year</th>
                <th>Homeworld</th>
                <th>Gender</th>
              </tr>
              <tbody>
                <tr>
                  <td>{character?.name}</td>
                  <td>{character?.birth_year}</td>
                  <td>{character?.homeworld.name}</td>
                  <td>{character?.gender}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="Container">
            <button className="AppButton" onClick={() => setNcharacter(1)}>
              First character
            </button>
            <button className="AppButton" onClick={goPrevious}>
              Previous character
            </button>
            <button className="AppButton" onClick={GoNext}>
              Next character
            </button>
            <button className="AppButton" onClick={goLast}>
              Last character
            </button>
          </div>
        </Fragment>
      ) : (
        "Loading"
      )}
    </Fragment>
  );
}
export { CharactersTable };
