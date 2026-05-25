import "./App.css"
import Nav from "./components/Nav";
import { IoSearch } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import Nocontact from "./components/Nocontact";
import AddContactUpdate from "./components/AddContactUpdate";
import { useEffect, useState } from "react";
import Contact from "./components/Contact";
import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./firrebase";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./components/Loader";



const App  =()=>{
const [addContact,setaddContact]=useState(false)
const [isAdd,setAdd]=useState(false);
const [isEdit,setIsEdit]=useState(false);
const [Error,setError]=useState(false);
const [loading,setLoading]=useState(false);
const [contacts, setContacts] = useState([]);
const [search, setSearch] = useState("");
const [selectedContact, setSelectedContact] = useState(null);


    const searchFunction=(e)=>{
       setSearch(e.target.value);
       console.log(search);
    
    }
       const filterData = contacts.filter((contact)=>
         contact.name.toLowerCase().includes(search.toLowerCase()) || contact.email.toLowerCase().includes(search.toLowerCase()) )
const deleteContact = async (id) =>{
   try {
      await deleteDoc (doc(db,"contacts", id))
      setContacts((prev) => prev.filter((item) => item.id !== id));
toast.success("succefuuly deleted");
   } catch (error) {
      
   }

}


useEffect(() => {
   setLoading(true)
  const contactRef = collection(db, "contacts");

  const unsubscribe = onSnapshot(contactRef, (snapshot) => {
    const ContactData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));


    setContacts(ContactData);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);
    
return <>
    <ToastContainer
  position="top-right"
  autoClose={2200}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnHover
  draggable
  theme="dark"
  toastClassName="custom-toast"
  bodyClassName="custom-toast-body"
  progressClassName="custom-progress"
/>
<div className="d-flex align-items-center w-100 justify-content-center bg-gre ">

<div className="container"
>
 <Nav clas="text-danger"/>
 <form>
    <div className="Search position-relative">
    <input onChange={searchFunction} type="text" placeholder="Search Contact"/>
     <IoSearch className="position-absolute icon"/>


    </div>
       <FaPlusCircle onClick={()=> {setaddContact(true);
        setIsEdit(false)
       }} className="addicon"/>
 </form>

 <div className="content ">


    {loading ? <Loader/> : contacts.length === 0 ? <Nocontact/> :  <Contact selectedContact={selectedContact} deleteContact={deleteContact} Contacts={contacts} filterData={filterData} setIsEdit={setIsEdit} setaddContact={setaddContact} setSelectedContact={setSelectedContact}/>}
   
    {}
 
  
 </div>
   {addContact && <AddContactUpdate setLoading={setLoading} setIsEdit={setIsEdit} setError={setError} contacts={contacts} IsEdit={isEdit} setaddContact={setaddContact} selectedContact={selectedContact}/>}
</div>
</div>
</>
}
 export default App;

