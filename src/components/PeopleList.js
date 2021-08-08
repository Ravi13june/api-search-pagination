import React, { useEffect, useState } from "react";
import axios from "axios";
import { Accordion } from "react-bootstrap";
import _ from "lodash";

 const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [searchPeople, setSearchPeople] = useState(people);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fecthData = async () => {
    const res = await axios.get(`https://swapi.dev/api/people`);
    const peopleInfo = res.data.results;
    console.log(peopleInfo);
    setPeople(peopleInfo);
    setSearchPeople(_(peopleInfo).slice(0).take(pageSize).value());
    
  };

  useEffect(() => {
    fecthData();
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = people.filter((data) => {
      return data.name.toLowerCase().search(value) !== -1;
    });
    setSearchPeople(result);
  };
  const pageCount = people ? Math.ceil(people.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedDetails = _(people).slice(startIndex).take(pageSize).value();
    setSearchPeople(paginatedDetails);
  };

  return (
    <div className="container mt-5">
    <input
    className="form-control"
      placeholder="Search Name..."
      type="text"
      onChange={(event) => handleSearch(event)}
    />
 
      <div className="row">
        <Accordion>
          {searchPeople.map((people, index) => (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header>{people.name}</Accordion.Header>
              <Accordion.Body>
                
                <p>Vechile: {people.vechile}</p>
                <p>Height: {people.height} cm</p>
                <p>Mass: {people.mass} kg</p>
                
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {pages.map((page, index) => (
              <li
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
                key={index}
              >
                <p className="page-link btn" onClick={() => pagination(page)}>
                  {page}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PeopleList
