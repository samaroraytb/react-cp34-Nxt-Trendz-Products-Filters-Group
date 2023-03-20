import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    isFetchingFailed: false,
    inputTyped: '',
    selectedCategoryId: '',
    applyRating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeOptionId,
      inputTyped,
      selectedCategoryId,
      applyRating,
    } = this.state

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${inputTyped}&category=${selectedCategoryId}&rating=${applyRating}`
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.products.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }))
        this.setState({
          productsList: updatedData,
          isLoading: false,
        })
      }
    } catch (error) {
      this.setState({isFetchingFailed: true, isLoading: false})
      console.log(error)
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  changeStateAsPerInput = userTyped => {
    this.setState({inputTyped: userTyped, isLoading: true}, this.getProducts)
  }

  changeCategoryFromAllProducts = categoryId => {
    this.setState(
      {selectedCategoryId: categoryId, isLoading: true},
      this.getProducts,
    )
  }

  changeRatingFromAllProducts = ratingId => {
    this.setState({applyRating: ratingId, isLoading: true}, this.getProducts)
  }

  clearAppliedFilterSetToDefault = () => {
    this.setState(
      {
        productsList: [],
        isLoading: false,
        activeOptionId: sortbyOptions[0].optionId,
        isFetchingFailed: false,
        inputTyped: '',
        selectedCategoryId: '',
        applyRating: '',
      },
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    const productsListLength = productsList.length
    if (productsListLength === 0) {
      return (
        <div className="no-products-available">
          <img
            className="no-products-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png "
            alt="no products"
          />
          <h1 className="not-found-heading">No Products Found</h1>
          <p className="not-found-details">
            We could not find any products. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailedFetchingSection = () => (
    <div className="no-products-available">
      <img
        className="no-products-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
      />
      <h1 className="not-found-heading">Oops! Something Went Wrong</h1>
      <p className="not-found-details">
        We are having some trouble processing your request. <br />
        Please try again
      </p>
    </div>
  )

  renderView = () => {
    const {isLoading, isFetchingFailed} = this.state
    switch (true) {
      case isLoading:
        return this.renderLoader()
      case isFetchingFailed:
        return this.renderFailedFetchingSection()
      default:
        return this.renderProductsList()
    }
  }

  render() {
    const {selectedCategoryId, applyRating} = this.state
    return (
      <div className="all-products-section">
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeStateAsPerInput={this.changeStateAsPerInput}
          changeCategoryFromAllProducts={this.changeCategoryFromAllProducts}
          selectedCategoryId={selectedCategoryId}
          changeRatingFromAllProducts={this.changeRatingFromAllProducts}
          applyRating={applyRating}
          clearAppliedFilterSetToDefault={this.clearAppliedFilterSetToDefault}
        />
        {this.renderView()}
      </div>
    )
  }
}

export default AllProductsSection
