import { AsyncStorage } from 'react-native'

export const setToken = token => AsyncStorage.setItem('token', token)

export const getToken = () => AsyncStorage.getItem('token')

export const removeToken = () => AsyncStorage.removeItem('token')
