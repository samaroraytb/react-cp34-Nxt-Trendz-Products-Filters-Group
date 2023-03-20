import './index.css'

const CategoryItems = props => {
  const {
    categoryDetails,
    clickedOnCategoryFromFilter,
    selectedCategoryId,
  } = props
  const {categoryId, name} = categoryDetails

  const clickedParticularCategory = () => {
    clickedOnCategoryFromFilter(categoryId)
  }
  const isActiveCategory = selectedCategoryId === categoryId
  const activeFilterStyling = isActiveCategory ? 'active-filter-css' : ''

  return (
    <li className="category-list-items">
      <button
        onClick={clickedParticularCategory}
        className={`filter-button-style ${activeFilterStyling}`}
        type="button"
      >
        <p>{name}</p>
      </button>
    </li>
  )
}

export default CategoryItems
