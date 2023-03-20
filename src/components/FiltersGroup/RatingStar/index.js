import './index.css'

const RatingStar = props => {
  const {eachRatingDetail, ratingStarToFilterGroup, applyRating} = props
  const {ratingId, imageUrl} = eachRatingDetail

  const clickedOnRating = () => {
    ratingStarToFilterGroup(ratingId)
  }

  const isActiveCategory = applyRating === ratingId
  const activeFilterStyling = isActiveCategory ? 'active-filter-css' : ''

  return (
    <li className="category-list-items">
      <button
        onClick={clickedOnRating}
        className={`filter-button-style raiting-seprate-style ${activeFilterStyling}`}
        type="button"
      >
        <img
          className="rating-star-image"
          src={imageUrl}
          alt={`rating ${ratingId}`}
        />
        <p className="up-stars-style">& up</p>
      </button>
    </li>
  )
}

export default RatingStar
