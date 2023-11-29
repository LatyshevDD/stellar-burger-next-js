import { all, call, delay, put, takeEvery } from 'redux-saga/effects'
import { getIngredience } from '@/utils/api'
import { setIngrediences, setError } from './ingrediencesDataSlice'
import { GetIngredienceRequestType } from '@/types/types'

// Сага для запроса ингридиентов с сервера, используется в компоненте teamplate из app директории
function* fetchIngrediences() {
  try {
    const ingrediences: GetIngredienceRequestType = yield call(getIngredience)
    yield put(setIngrediences([...ingrediences.data]))
  }
  catch(error) {
    yield put(setError({hasError: true, errorMessage: 'Ошибка'}))
  }
}

export function* watchfetchIngrediences() {
  yield takeEvery('FETCH_INGREDIENCES', fetchIngrediences)
}

//rootSaga
export default function* rootSaga() {
  yield all([
    call(watchfetchIngrediences)
  ])
}