import React from 'react';
import { Link } from 'react-router-dom';

import { TRIPS } from '../../constants/routes';

const TripItem = item => (
  <Link to={`${TRIPS}/${item._id}`} className="book_item">
    <div className="book_header">
      <h2>
        {item.title}
      </h2>
    </div>
    <div className="book_items">
      <div className="book_author">
        {item.author}
      </div>

      <div className="book_bubble">
        <strong>
Price
        </strong>
        {' '}
$
        {item.price}
      </div>

      <div className="book_bubble">
        <strong>
Duration
        </strong>
        {' '}
        {item.duration}
        {' '}
days
      </div>

      <div className="book_bubble rating">
        <strong>
Rating
        </strong>
        {' '}
        {item.rating}
        {' '}
/ 5
      </div>

    </div>
  </Link>
);

export default TripItem;
