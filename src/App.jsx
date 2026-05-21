import "./App.css"
import Nav from "./components/Nav";
import { IoSearch } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import Nocontact from "./components/Nocontact";
import AddContactUpdate from "./components/AddContactUpdate";
import { useEffect, useState } from "react";
import Contact from "./components/Contact";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firrebase";
import { toast, ToastContainer } from "react-toastify";



const App  =()=>{
const [addContact,setaddContact]=useState(false)
const [isAdd,setAdd]=useState(false);
const [isEdit,setIsEdit]=useState(false);
const [Error,setError]=useState(false);
const [contacts, setContacts] = useState([]);
const [selectedContact, setSelectedContact] = useState(null);


    const inputFunction =(e)=>{
       const name=e.target.value;
       console.log(name)  
    }
const deleteContact = async (id) =>{
   try {
      await deleteDoc (doc(db,"contacts", id))
      setContacts((prev) => prev.filter((item) => item.id !== id));
toast.success("succefuuly deleted");
   } catch (error) {
      
   }

}

const getContact = async ()=>{
try {
    const contactRef = collection(db,"contacts");
    const Snapshot= await getDocs(contactRef);
    const ContactData = Snapshot.docs.map((doc)=>({
        id : doc.id,
       ...doc.data(),
    }));
    setContacts(ContactData);
    console.log(ContactData)
} catch (error) {
        console.log(Error);
}

}
useEffect(
    ()=>{getContact()},[]
)
    
return <>
<div className="d-flex align-items-center w-100 justify-content-center bg-gre ">

<div className="container"
>
 <Nav clas="text-danger"/>
 <form>
    <div className="Search position-relative">
    <input onChange={inputFunction} type="text" placeholder="Search Contact"/>
     <IoSearch className="position-absolute icon"/>


    </div>
       <FaPlusCircle onClick={()=> {setaddContact(true);
        setIsEdit(false)
       }} className="addicon"/>
 </form>

 <div className="content ">
    <ToastContainer className="toastify"/>
   
    {contacts.length === 0 ? <Nocontact/> :  <Contact selectedContact={selectedContact} deleteContact={deleteContact} Contacts={contacts} setIsEdit={setIsEdit} setaddContact={setaddContact} setSelectedContact={setSelectedContact}/>}
 
  
 </div>
   {addContact && <AddContactUpdate setError={setError} contacts={contacts} IsEdit={isEdit} setaddContact={setaddContact} selectedContact={selectedContact}/>}
</div>
</div>
</>
}
 export default App;

