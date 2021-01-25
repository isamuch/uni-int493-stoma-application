import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBiMXJTvEuQXwyjszlpa02oNzgGmWLSWc8",
    authDomain: "test-realtime-database-394a2.firebaseapp.com",
    databaseURL: "https://test-realtime-database-394a2.firebaseio.com",
    projectId: "test-realtime-database-394a2",
    storageBucket: "test-realtime-database-394a2.appspot.com",
    messagingSenderId: "540574741937"
};

const firebaseApp = firebase.initializeApp(config)

export function signInFB(email, password) {
    return firebaseApp.auth().signInWithEmailAndPassword(email ,password)
}

export function signOutFB() {
    return firebaseApp.auth().signOut()
}

export function getUid() {
    return firebaseApp.auth().currentUser.uid
}

export function getRef(node) {
    return firebaseApp.database().ref(node)
}

export function pushData(node, data) {
    return firebaseApp.database().ref(node).push(data)
}

export function listenerData(node, callback) {
    console.log(node)
    // return firebase.database().ref(node).on('value')
    return firebase.database().ref(node).on('value',snap=>callback(snap))
}

export function deleteItemFB(node, key) {
    console.log(node)
    console.log(key)
    return firebaseApp.database().ref(node).child(key).remove()
}

export function updateData(node, key, data) {
    console.log(node)
    console.log(key)
    console.log(data)
    return firebaseApp.database().ref(node).child(key).update(data)
}

export function getData(node) {
    console.log('node in get data', node)
    return firebase.database().ref(node).once('value')
}

export function singUp(email, password) {
    return firebaseApp.auth().createUserWithEmailAndPassword(email, password)
}



