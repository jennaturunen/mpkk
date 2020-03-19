import React, {useEffect, useState} from 'react';
import CatRow from './catRow';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/';

const CatTable = () => {
  const [picArray, setPicArray] = useState([]);
  const loadMedia = async () => {
    // Hae kaikki kuvat -> saadaan selville kuvan id
    const response = await fetch(baseUrl + 'media');
    const json = await response.json();
    // Haetaan yksittäiset kuvat, jotta saadaan thumbnailit
    const items = await Promise.all(json.map(async (item) => {
      const response = await fetch(baseUrl + 'media/' + item.file_id);
      return await response.json();
    }));
    console.log(items);
    setPicArray(items);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <table>
      <tbody>
        {
          picArray.map((file, index) => <CatRow file={file} key={index}/>)
        }
      </tbody>
    </table>
  );
};

export default CatTable;
