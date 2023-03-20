import {AiOutlineSearch} from 'react-icons/ai'
import CategoryItems from './CategoryItems'
import RatingStar from './RatingStar'
import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    changeStateAsPerInput,
    changeCategoryFromAllProducts,
    selectedCategoryId,
    changeRatingFromAllProducts,
    applyRating,
    clearAppliedFilterSetToDefault,
  } = props

  const changeInputTyped = event => {
    if (event.key === 'Enter') {
      changeStateAsPerInput(event.target.value)
    }
  }

  const clickedOnCategoryFromFilter = categoryId => {
    changeCategoryFromAllProducts(categoryId)
  }

  const ratingStarToFilterGroup = ratingId => {
    changeRatingFromAllProducts(ratingId)
  }

  const callingClearFilter = () => {
    clearAppliedFilterSetToDefault()
  }

  return (
    <div className="filters-group-container">
      <label htmlFor="searchBox" className="search-box-container-label">
        <input
          onKeyDown={changeInputTyped}
          className="input-search-box"
          id="searchBox"
          type="search"
          placeholder="Search"
        />
        <AiOutlineSearch />
      </label>
      <h1 className="filter-heading">Category</h1>
      <ul className="filter-un-order-list">
        {categoryOptions.map(eachCategory => (
          <CategoryItems
            clickedOnCategoryFromFilter={clickedOnCategoryFromFilter}
            key={eachCategory.id}
            categoryDetails={eachCategory}
            selectedCategoryId={selectedCategoryId}
          />
        ))}
      </ul>
      <h1 className="filter-heading">Rating</h1>
      <ul className="filter-un-order-list">
        {ratingsList.map(eachRating => (
          <RatingStar
            key={eachRating.id}
            eachRatingDetail={eachRating}
            ratingStarToFilterGroup={ratingStarToFilterGroup}
            applyRating={applyRating}
          />
        ))}
      </ul>
      <button
        onClick={callingClearFilter}
        className="clear-filter-button"
        type="button"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
