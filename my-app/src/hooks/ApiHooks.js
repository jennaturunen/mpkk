import {useState, useEffect} from 'react';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/';

const useAllMedia = () => {
  const [data, setData] = useState([]);
  const fetchUrl = async () => {
    // Hae kaikki kuvat -> saadaan selville kuvan id
    const response = await fetch(baseUrl + 'media');
    const json = await response.json();
    // Haetaan yksittäiset kuvat, jotta saadaan thumbnailit
    const items = await Promise.all(json.map(async (item) => {
      const response = await fetch(baseUrl + 'media/' + item.file_id);
      return await response.json();
    }));
    console.log(items);
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};

const useSingleMedia = (id) => {
  const [data, setData] = useState({});
  // fetch data from api
  const fetchUrl = async (fileid) => {
    const response = await fetch(baseUrl + 'media/' + fileid);
    const item = await response.json();
    setData(item);
  };

  useEffect(() => {
    fetchUrl(id);
  }, [id]);

  return data;
};
export {
  useAllMedia,
  useSingleMedia,
};
