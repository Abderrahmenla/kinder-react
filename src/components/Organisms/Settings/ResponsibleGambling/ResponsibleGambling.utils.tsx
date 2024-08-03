import { apiClient } from 'src/services/clientAxios';

export const selfExclude = async (body: { couponCode: string }) =>
  await apiClient.post('/api/player/selfExclude', body);

export const setLimit = async (body: { couponCode: string }) =>
  apiClient.post('/api/player/setLimit', body);

export const deleteLimit = async (limitId: number) =>
  await apiClient.delete(`/api/player/limit/${limitId}`);

export const updateLimit = async (body: { couponCode: string }) =>
  apiClient.put('/api/player/updateLimit', body);

export const updatePlayerTimeOut = async (body: { couponCode: string }) =>
  apiClient.put('/api/player/updateTimeOut', body);
