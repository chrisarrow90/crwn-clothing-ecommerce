import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPage from '../collection/collection.component'

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'

import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props
    fetchCollectionsStartAsync()
  }

  render() {
    const { match, isCollectionsLoaded } = this.props

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route
          path={`${match.path}/:collectionId`}
          component={(props) => (
            <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
