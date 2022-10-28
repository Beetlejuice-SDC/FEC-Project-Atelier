import React from 'react';

const SearchQA = ({ handleSearch }) => (
  <div>
    <input size="67" type="text" placeholder="Have a question? Search for answers..." onChange={(e) => handleSearch(e.target.value)} />
  </div>
);

export default SearchQA;