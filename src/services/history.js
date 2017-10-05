import { useRouterHistory } from 'react-router';
/* eslint-disable import/no-extraneous-dependencies */
import { createHistory } from 'history'; // dep of react-router

export default useRouterHistory(createHistory)({
  basename: URI_PREFIX || '',
});
