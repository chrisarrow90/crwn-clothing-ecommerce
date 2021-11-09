import { all, call } from 'redux-saga/effects'

import { fetchCollectionsStart } from './shop/shop.sagas'

export default function* rootSaga() {
  // all allows all sagas to run concurrently
  yield all([call(fetchCollectionsStart)])
}
