import { takeLatest, call, put } from 'redux-saga/effects'
import { collection, getDocs } from 'firebase/firestore'
import { db, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'
import ShopActionTypes from './shop.types'

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = collection(db, 'collections')
    const snapshot = yield getDocs(collectionRef)
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message))
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}
