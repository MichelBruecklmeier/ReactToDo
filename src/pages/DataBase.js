import { initializeApp } from "firebase/app";
import {deleteDoc, query, doc,where, getFirestore , collection, getDocs, addDoc, updateDoc , getDoc} from "firebase/firestore";
import Config from "./Config";

const firebaseConfig = Config();

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
//To add data
export async function addData(username,task){
    const ref = await addDoc(collection(db,username), task)
}
//This will delete a whole collection/user
export async function deleteUser(username){
    //get all the docs asscosiated with the user
    const userDocs = getDocs(collection(db,username));
    //loop thru every doc and delete it 
    (await userDocs).forEach((document)=>deleteDoc(doc(db,username,document.id)));
}
//To delete data
export async function deleteData(username,id){
    const q =  query(
        collection(db, username),
        where('id', '==', id)
    );
    const dumb = await getDocs(q);
    dumb.docs.forEach((d) => {
        async function deleteTheThing(){
            const docRef = doc(db,username,d.id);
            
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
export async function toggleData(username,task){
    const id = task.id;
    const q =  query(
        collection(db, username),
        where('id', '==', id)
    );
    task.done = !task.done;
    const docs = await getDocs(q);
    for(const d of docs.docs){
        const docRef = doc(db, username, d.id);
        await updateDoc(docRef,task)
    }  
}
//To get all data
export async function getData(username){
    const query = await getDocs(collection(db,username));
    return query;
}

export default function DB(){

    return(
        <h1>Hopefully this works</h1>
    )
}