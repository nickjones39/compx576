// import React from 'react';

// import './Asset.css';

// const Asset = props => {};

// export default Asset;


import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './Asset.css';

const Asset = props => {
  return (
    <li className="asset-item">
      <Card className="asset-item__content">
        <Link to={`/${props.id}/places`}>
          
          <div className="asset-item__info">
            <h2>{props.product}</h2>
            
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default Asset;
