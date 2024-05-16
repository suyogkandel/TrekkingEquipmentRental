import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Helmet from '../../../components/Helmet/Helmet';
import '../../../styles/img-container.css';

function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [sortedCategory, setSortedCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/getCategory`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCategory(res.data.category);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Sort categories alphabetically when 'category' changes
    const sorted = [...category].sort((a, b) => a.name.localeCompare(b.name));
    setSortedCategory(sorted);
  }, [category]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const filteredCategories = sortedCategory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
  );

  if (loading) {
    return <h4>Loading Categories...</h4>;
  } else {
    var showCategoryList = '';
    showCategoryList = filteredCategories.map((item, idx) => {
      return (
        <div className="col-md-4" key={idx}>
          <div className="card h-100">
            <Link to={`collections/${item.slug}`}>
              <img
                src={`http://localhost:8000/${item.image}`}
                className="w-100 img_container"
                alt={item.name}
              />
            </Link>
            <div className="card-body">
              <Link to={`collections/${item.slug}`}>
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  if (showCategoryList.length > 0) {
    return (
      <div>
        <Helmet title='Category'>
          <div className="py-3 bg-success">
            <div className="container">
              <h6>Categories</h6>
            </div>
          </div>

          <div className="py-3">
            <div className="container">
              <div className="row">
                <div className="col-md-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">{showCategoryList}</div>
            </div>
          </div>
        </Helmet>
      </div>
    );
  } else {
    return (
      <div>
        <div className="py-3 bg-warning">
          <div className="container">
            <h6>Category Page</h6>
          </div>
        </div>

        <div className="py-3">
          <div className="container">
          <div className="row">
                <div className="col-md-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="form-control"
                  />
                </div>
              </div>
            <h4>No Collections</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewCategory;
