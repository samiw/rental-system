import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  catlogData: PropTypes.array,
  onSetCategory: PropTypes.func,
};

const Navigation = props => {
  const { onSetCategory, catlogData } = props;
  const [locations, setLocation] = useState([]);

  useEffect(() => {
    setLocation(catlogData);
  }, [catlogData, setLocation]);

  return (
    <nav className="navigation">
      <ul className="mainmenu">
        {locations &&
          locations.map((loaction, index) => {
            return (
              <li key={`${index}-${loaction.name}`}>
                <span onClick={() => onSetCategory({ dealer_id: loaction.dealers_id })}>{loaction.name}</span>
                {loaction.branches.length > 0 && (
                  <ul className="submenu">
                    {loaction.branches.map((items, i) => {
                      return (
                        <li key={`${index}-${items.name}`}>
                          <span
                            onClick={() =>
                              onSetCategory({ dealer_id: loaction.dealers_id, branch_id: items.branch_id })
                            }
                          >
                            {items.name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

Navigation.propTypes = propTypes;
export default Navigation;
