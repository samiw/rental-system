import React, { useState } from 'react';
import Navigation from './Navigation';
import PropTypes from 'prop-types';

const propTypes = {
  catlogData: PropTypes.array,
  onHomePage: PropTypes.func,
  onSetCategory: PropTypes.func,
};

const Header = props => {
  const { onSetCategory, onHomePage, catlogData } = props;
  const [open, setOpen] = useState(false);
  return (
    <header>
      <div id="header">
        <div className="cursorPointer">
          <h3 onClick={onHomePage} className="fontWeight700">
            RENTAl MANAGEMENT SYSTEM
          </h3>
        </div>
        <div onClick={() => setOpen(!open)} className="positionRelative cursorPointer">
          Select Location
          {open && <Navigation catlogData={catlogData} onSetCategory={onSetCategory} />}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = propTypes;
export default Header;
