import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Card from './components/Card';
import Input from './components/Input';

const SortButton = styled.button`
  background-color: #1F7B44;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 16px;
  cursor: pointer;
`;

function App() {
  const [totalItems, setTotalItems] = useState(0);
  const [listItems, setListItems] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:5000/api/list');
      const data = response.data;

      setTotalItems(data.length);
      setListItems(data);
      setIsLoading(false);
      setIsSearchEmpty(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSearch(title) {
    setIsSearchEmpty(false);
    setIsLoading(true);

    let filter = { title };

    if (!isNaN(title)) {
      filter.title = parseInt(title);
    } else if (title.toUpperCase() === "NULL") {
      filter.title = null;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/list', { filter });
      const data = response.data;

      if (data.length === 0) {
        setIsSearchEmpty(true);
        setTotalItems(0);
        setListItems([]);
      } else {
        setListItems(data);
        setTotalItems(data.length);
      }

      setIsSearchSuccessful(true);
    } catch (error) {
      console.error(error.message);
      setIsSearchSuccessful(false);
    }

    setIsLoading(false);
  }

  const sortListByDatetime = () => {
    const sorted = [...listItems].sort((a, b) => {
      const dateA = new Date(a.datetime);
      const dateB = new Date(b.datetime);

      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setSortedList(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="container min-vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <h1 className="mt-2 mb-5 fw-bold">React EASYRICE</h1>
          </div>
        </div>
      </div>

      <div className="container-fluid w-50">
        <div className="row">
          <Input title="SEARCH" onSearch={handleSearch} />
          {isLoading ? (
            <div className="col-12 d-flex justify-content-center align-items-center">
              <h1 className="my-2">Loading</h1>
            </div>
          ) : (
            <div>
              {!isSearchSuccessful && (
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <h5 className="my-3 text-danger fw-bold text-center">Title นั้นต้องเป็น string และไม่เป็นค่าว่าง (undefined, null, “”)</h5>
                </div>
              )}
              <div className="col-12 d-flex justify-content-center align-items-center">
                <h5 className="my-3 mx-auto">Total : {totalItems}</h5>
                <SortButton onClick={sortListByDatetime}>Sort by Datetime: {sortOrder === 'asc' ? 'Asc' : 'Desc'}</SortButton>
              </div>
              {isSearchEmpty ? (
                <div>
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <h5 className="my-3 text-danger fw-bold text-center">ไม่พบข้อมูล</h5>
                    <button type="button" className="btn btn-success ms-1" onClick={fetchData}>REFRESH</button>
                  </div>
                </div>
              ) : (
                sortedList.length > 0 ? (
                  sortedList.map(item => (
                    <Card key={item.id} title={item.title} description={item.description} datetime={item.datetime} image={item.image} />
                  ))
                ) : (
                  listItems.map(item => (
                    <Card key={item.id} title={item.title} description={item.description} datetime={item.datetime} image={item.image} />
                  ))
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
