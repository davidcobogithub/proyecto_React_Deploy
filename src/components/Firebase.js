import firebase from 'firebase/app';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyC6uQtpxt5Mq1Ux_w7P8fbPB2B0oAVfoUo",
    authDomain: "todo-fa00d.firebaseapp.com",
    databaseURL: "https://todo-fa00d.firebaseio.com",
    projectId: "todo-fa00d",
    storageBucket: "todo-fa00d.appspot.com",
    messagingSenderId: "654800867420"
  };
  firebase.initializeApp(config);
export default firebase;