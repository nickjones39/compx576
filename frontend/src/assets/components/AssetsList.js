import React from 'react';

import Asset from './Asset';
import Card from '../../shared/components/UIElements/Card';
import './AssetList.css';

const AssetList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="asset-list">
      {props.asset.map(asset => (
        <Asset
          key={asset.id}
          id={asset.id}
          name={asset.product}
        />
      ))}
    </ul>
  );
};

export default AssetList;
