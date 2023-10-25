import React, { useState, useEffect } from 'react';

function SearchComponent() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=ade9ac2663bdc8bc0eae7b07d7787d12')
      .then((response) => response.json())
      .then((result) => setData(result.results))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchQuery]);

  // project name on left, search on right
// Search Movies: search bar
// all {genre} movies followed by carousel movie reel
// the above is to note what I need to complete, will erase after

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;
