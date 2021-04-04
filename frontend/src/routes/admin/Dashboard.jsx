import React from 'react';
import { getAuthToken } from '../../helpers/user.js';

export const DashboardPage = () => {
  console.log('GET' + getAuthToken());
  return <div>{getAuthToken()}</div>;
};
