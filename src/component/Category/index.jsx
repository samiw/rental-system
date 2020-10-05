import React from 'react';
import './category.css';
import PropTypes from 'prop-types';
import { PublicUrl } from '../../config';

const propTypes = {
  catalog: PropTypes.object,
  categories: PropTypes.array,
  onSetCategory: PropTypes.func,
};

const Category = props => {
  const { categories, onSetCategory, catalog } = props;

  function setLoction(data) {
    if (!data.isSubCategory) {
      onSetCategory({
        dealer_id: data.dealers_id,
        branch_id: data.branch_id,
        category_id: data.name,
      });
    }
  }

  return (
    <div className="contentArea">
      <h2 className="space">
        <span className="cursorPointer textUnderLine" onClick={() => setLoction({ dealers_id: catalog.dealer_id })}>
          Equipment Catalog
        </span>
        {catalog && catalog.category_id ? (
          <span
            className="cursorPointer"
            onClick={() => setLoction({ dealers_id: catalog.dealer_id, branch_id: catalog.branch_id })}
          >
            {' '}
            / <span className="textUnderLine">{catalog.category_id}</span>
          </span>
        ) : (
          ''
        )}
      </h2>
      <div className="gridContainer">
        {categories.map((items, index) => (
          <div className="item" key={index}>
            <img
              onClick={() => setLoction(items)}
              src={`${PublicUrl}/images/${items.isSubCategory ? 'subcategory' : 'category'}/${items.image}`}
              alt={items.name}
              className="cursorPointer"
            />
            <div>
              <h3 className="itemBox">{items.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Category.propTypes = propTypes;
export default Category;
