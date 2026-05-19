import "./App.css"
import Nav from "./components/Nav";
import { IoSearch } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import Nocontact from "./components/Nocontact";
import AddContactUpdate from "./components/AddContactUpdate";
import { useEffect, useState } from "react";
import Contact from "./components/Contact";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firrebase";



const App  =()=>{
const [addContact,setaddContact]=useState(false)
const [isAdd,setAdd]=useState(false);
const [isEdit,setIsEdit]=useState(false);
const [error,setError]=useState(false);
const [contacts, setContacts] = useState([]);
const [selectedContact, setSelectedContact] = useState(null);


    const inputFunction =(e)=>{
       const name=e.target.value;
       console.log(name)  
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
        console.log(error);
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
   
    {contacts.length === 0 ? <Nocontact/> :  <Contact Contacts={contacts} setIsEdit={setIsEdit} setaddContact={setaddContact} setSelectedContact={setSelectedContact}/>}
 
  
 </div>
   {addContact && <AddContactUpdate setError={setError} contacts={contacts} IsEdit={isEdit} setaddContact={setaddContact} selectedContact={selectedContact}/>}
</div>
</div>
</>
}
 export default App;

