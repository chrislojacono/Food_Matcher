import React, { Component } from 'react';
import BusinessCard from '../Cards/yelpBusinessCard';
import YelpData from '../../Helpers/Data/YelpData';

export default class HomePageView extends Component {
  state = {
    businesses: [],
    searchTerm: 'pizza',
    locationTerm: 'nashville, tn',
  };

  componentDidMount() {
    const {
      searchTerm,
      locationTerm,
    } = this.state;
    YelpData(locationTerm, searchTerm).then(
      (response) => {
        this.setState({
          businesses: response,
        });
      },
    );
  }

  render() {
    const { businesses } = this.state;
    const renderProducts = () => businesses.map((business) => (<BusinessCard key={business.id} businessData={business} />));
    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <h1 className="m-2">Yelp stuff</h1>
          <div className="d-flex flex-wrap justify-content-center">
           {renderProducts()}
          </div>
        </div>
    );
  }
}
