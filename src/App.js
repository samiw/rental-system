import React, { useState, useEffect, useCallback } from 'react';
import Header from './component/Header.jsx';
import Footer from './component/Footer.jsx';
import Categoary from './component/Category/index';
import catlogData from './Data/catalog.json';
import Home from './component/Home.jsx';
import ErrorComponent from './component/ErrorComponent';
import { PublicUrl } from './config';
import './style.css';

const App = () => {
  const [catalog, setCatalog] = useState({});
  const [categories, setCategories] = useState([]);
  const [hasError, setHasError] = useState(Object.keys(catlogData.error).length ? true : false);
  const [loading, setLoader] = useState(false);
  /*
   * Get filter by all category by location or branch or sub-category
   */
  const handleCategoryInCatelog = useCallback((dealerId, branchId, category_id) => {
    let category = [];
    const arrLocation = catlogData.data.locations;
    const len = arrLocation.length;
    let isBreakCategory = false;
    if (len > 0) {
      for (let i = 0; i < arrLocation.length; i++) {
        if (arrLocation[i].dealers_id === dealerId) {
          let branchLen = arrLocation[i].branches.length;
          for (let j = 0; j < branchLen; j++) {
            let ctLen = arrLocation[i].branches[j].categories.length;

            // for sub category.
            if (category_id) {
              if (arrLocation[i].branches[j].branch_id === branchId) {
                for (let k = 0; k < ctLen; k++) {
                  if (arrLocation[i].branches[j].categories[k].name === category_id) {
                    const subCLen = arrLocation[i].branches[j].categories[k].subcategories.length;
                    for (let l = 0; l < subCLen; l++) {
                      const subCategory = arrLocation[i].branches[j].categories[k].subcategories[l];
                      subCategory.isSubCategory = true;
                      category.push(subCategory);
                    }
                    isBreakCategory = true;
                    break;
                  }
                }
                isBreakCategory = true;
              }
            }
            // for branch category
            else if (branchId) {
              if (arrLocation[i].branches[j].branch_id === branchId) {
                const arrCategory = getBranchCategory(i, j, ctLen, category);
                category = arrCategory;
                isBreakCategory = true;
              }
            }
            // for location category
            else {
              const arrCategory = getBranchCategory(i, j, ctLen, category);
              category = arrCategory;
            }
            if (isBreakCategory) break;
          }
          if (isBreakCategory) break;
        }
      }
      setCategories(category); // set the category based of filter.
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    const { dealer_id, branch_id, category_id } = catalog;
    handleCategoryInCatelog(dealer_id, branch_id, category_id);
  }, [catalog, handleCategoryInCatelog]);

  // get category by location of branch.
  function getBranchCategory(i, j, ctLen, category) {
    const arrLocation = catlogData.data.locations;
    for (let k = 0; k < ctLen; k++) {
      const catData = arrLocation[i].branches[j].categories[k];
      catData.dealers_id = arrLocation[i].dealers_id;
      catData.branch_id = arrLocation[i].branches[j].branch_id;
      category.push(arrLocation[i].branches[j].categories[k]);
    }
    return category;
  }

  // set category to display
  function handleSetCategory(data) {
    setLoader(true); // if we want the loader effect add in settimeout or api response.
    setCatalog(data);
  }

  // go to the home page
  function handleHomePage() {
    setCatalog({});
    setCategories([]);
  }

  return (
    <div>
      <Header
        onHomePage={handleHomePage}
        catlogData={!hasError ? catlogData.data.locations : []}
        onSetCategory={handleSetCategory}
      />
      <section>
        <div id="content">
          {!hasError ? (
            Object.keys(catalog).length ? (
              <Categoary catalog={catalog} categories={categories} onSetCategory={handleSetCategory} />
            ) : (
              <Home />
            )
          ) : null}
        </div>
        {loading && <img src={`${PublicUrl}/loading.gif`} alt="loading" className="loaderCss" />}
        {hasError && <ErrorComponent />}
      </section>
      <Footer />
    </div>
  );
};

export default App;
