import { initializeApp } from "firebase/app";
import {deleteDoc, query, doc,where, getFirestore , collection, getDocs, addDoc, updateDoc , getDoc} from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
      apiKey: "AIzaSyAXng_UHks8e24rRVpf4Jsw0cM1orXmUmg",    authDomain: "todo-react-e07c8.firebaseapp.com",    projectId: "todo-react-e07c8",    storageBucket: "todo-react-e07c8.firebasestorage.app",    messagingSenderId: "1059241195878",    appId: "1:1059241195878:web:6cf328eef1b00f9a4230a7",    measurementId: "G-V0HDPY4ZNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//To add data
export async function addData(task){
    const ref = await addDoc(collection(db,"tasks"), task)
}
//To delete data
export async function deleteData(id){
    const q =  query(
        collection(db, 'tasks'),
        where('id', '==', id)
    );
    const dumb = await getDocs(q);
    dumb.docs.forEach((d) => {
        async function deleteTheThing(){
            const docRef = doc(db,'tasks',d.id);
            
            try{
                await deleteDoc(docRef);
            } catch(err) {
                console.error(`Failed to delete doc id ${docRef.id}`);
            }
        }
        deleteTheThing();
    });
}
//To toggle a task
export async function toggleData(task){
    const id = task.id;
    const q =  query(
        collection(db, 'tasks'),
        where('id', '==', id)
    );
    task.done = !task.done;
    const docs = await getDocs(q);
    for(const d of docs.docs){
        const docRef = doc(db, 'tasks', d.id);
        await updateDoc(docRef,task)
    }  
}
//To get all data
export async function getData(){
    const query = await getDocs(collection(db,"tasks"));
    return query;
}

export default function DB(){

    return(
        <h1>Hopefully this works</h1>
    )
}