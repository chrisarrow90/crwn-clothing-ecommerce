import { all, call } from 'redux-saga/effects'

import { fetchCollectionsStart } from './shop/shop.sagas'
import { userSagas } from './user/user.sagas'
import { cartSagas } from './cart/cart.sagas'

export default function* rootSaga() {
  // all allows all sagas to run concurrently
  yield all([call(fetchCollectionsStart), call(userSagas), call(cartSagas)])
}
