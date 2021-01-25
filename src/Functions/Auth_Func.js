import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

const KEY_CHECK_AUTH = 'LOGIN'

const KEY_UID = 'UID'

export const getCheckAuth = () => AsyncStorage.getItem(KEY_CHECK_AUTH) 

export const getUid = () => AsyncStorage.getItem(KEY_UID) 

export const saveAuth = () => AsyncStorage.setItem(KEY_CHECK_AUTH, 'true')

export const saveUid = (uid) => AsyncStorage.setItem(KEY_UID, uid)

export const removeAuth = () => AsyncStorage.removeItem(KEY_CHECK_AUTH)

export const removeUid = () => AsyncStorage.removeItem(KEY_UID)