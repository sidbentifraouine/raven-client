import { useRouterHistory } from 'react-router'
import { createHistory } from 'history' // dep of react-router

export default useRouterHistory(createHistory)({
  basename: URI_PREFIX || ''
})
