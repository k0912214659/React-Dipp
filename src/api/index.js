import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { CreateUserOperationAPI } from './user-apis';
import { CreateWeatherPresetOperationAPI } from './weatherPreset-apis';

firebase.initializeApp({
  apiKey: 'AIzaSyACIeRAIqzgMc9Y4bgB1YXeD71v7wdzNE0',
  authDomain: 'react-dipp.firebaseapp.com',
  databaseURL: 'https://react-dipp.firebaseio.com',
  projectId: 'react-dipp',
  storageBucket: 'react-dipp.appspot.com',
  messagingSenderId: '471265101440',
  appId: '1:471265101440:web:ed4d86feebbe890e87c865',
});

class API {
  constructor() {
    this.user = CreateUserOperationAPI({ firebase });
    this.weatherPreset = CreateWeatherPresetOperationAPI({ firebase });
  }
}

export default API;
