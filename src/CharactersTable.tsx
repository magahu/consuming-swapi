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



function CharactersTable() {
  const SWAPI_URL = "http://swapi.dev/api/people";
  const [swapiData, setSwapiData] = useState<swapiResults>();
  //const [planet, setPlanet] = useState<swapiPlanet>
  const [character, setCharacter] = useState<Character>();
  const [nCharacter, setNcharacter] = useState<number>(1);
  const fetchingData = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
    const response = await fetch(SWAPI_URL);
    const data = await response.json();
    setSwapiData(data);
  };
  const fetchingCharacter = async () => {
    // Set up options for the fetch request
    /*const options: RequestInit = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    };*/

    // const response = await fetch(SWAPI_URL + "/" + nCharacter, options);
    const response = await fetch(SWAPI_URL + "/" + nCharacter);
    const data = await response.json();
    setCharacter(data);
  };

  const fetchingPlanet = async () => {
    const response = await fetch(SWAPI_URL + "/" + nCharacter);
    const data = await response.json();
    setPlanet(data);
  }

  const GoNext = () => {
    if (swapiData != undefined && swapiData.count != undefined) {
      if (nCharacter + 1 <= swapiData.count) {
        setNcharacter((nCharacter) => nCharacter + 1);
      } else {
        setNcharacter(1);
      }
    }
  };

  const goPrevious = () => {
    if (swapiData != undefined && swapiData.count != undefined) {
      if (nCharacter - 1 >= 1) {
        setNcharacter((nCharacter) => nCharacter - 1);
      } else {
        setNcharacter(swapiData.count);
      }
    }
  };

  const goLast = () => {
    if (swapiData?.count != undefined && swapiData.count != undefined) {
      setNcharacter(swapiData.count);
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
      {swapiData?.results ? (
        <Fragment>
          <table className="Table">
            <tr>
              <th>Name</th>
              <th>Bird year</th>
              <th>Homeworld</th>
              <th>Gender</th>
            </tr>
            <tbody>
              {swapiData?.results.map((result, i) => {
                return (
                  <tr key={i}>
                    <td>{result.name}</td>
                    <td>{result.birth_year}</td>
                    <td>{result.homeworld}</td>
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
                  <td>{character?.homeworld}</td>
                  <td>{character?.gender}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="Container">
            <button className='AppButton' onClick={() => setNcharacter(1)}>First character</button>
            <button className='AppButton' onClick={goPrevious}>Previous character</button>
            <button className='AppButton' onClick={GoNext}>Next character</button>
            <button className='AppButton' onClick={goLast}>Last character</button>
          </div>
        </Fragment>
      ) : (
        "Loading"
      )}
    </Fragment>
  );
}
export { CharactersTable };
