import "./AddContactUpdate.css"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect,useState } from "react";
import { db } from "../firrebase";
import { toast } from "react-toastify";


const AddContactUpdate =({setaddContact,IsEdit,selectedContact,setError,contacts})=>{
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const HandleUpdate =async () =>{
  if(!selectedContact) return;
  try {
      const contactRef = doc(db,"contacts",selectedContact.id);
  await updateDoc(contactRef ,{name,
    email
  });
  setName("");
    setEmail("");
    setaddContact((prev)=>!prev);
  } catch (error) {
    console.log(error)
  }

}
useEffect(() => {
    if (IsEdit && selectedContact) {
      setName(selectedContact.name);
      setEmail(selectedContact.email);
    }
  }, [IsEdit, selectedContact]);
const addContact = async () => {
  if(!name || !email) {
    toast.error("Enter Email and Name");
    return;
    
  };
  if(!email.includes("@gmail.com")){
    toast.error("Email Must End With @gmail.com");
    return;
  }
    if(name.length < 3 ||  name.length >20){
    toast.error("Name length be between 3 to 20");
    return;
  }

try {
  

  const alreadyExist = contacts.some(
    (contact)=>(contact.name === name)
  )
  if(
    alreadyExist
  ){
   toast.error("Name Already Exist")
  return;
  }
  await addDoc(collection(db,"contacts"),{
    name,
    email
  });
  toast.success("Contact Added Sucessfully");
    setName("");
    setEmail("");
    setaddContact((prev)=>!prev);
} catch (error) {
 toast.error("Can't Add Contact")

}}



    return (
    
     <>
<div className="overlay">

  <div className="modal-dialog">
    <div className="modalbox">

    <div className="modal-content">
      <div className="modal-header">
       
      </div>
      <div className="modal-body">
       <form>
        <div className=" form-set">

        <label>Name</label>
        <input onChange={(e)=>{
       setName(e.target.value);
    }
} type="text" placeholder={IsEdit ? selectedContact.name : "Enter Name"}  />

        <label>Email</label>
     <input onChange={(e)=>{
     setEmail(e.target.value);
    }
} type="text" placeholder={IsEdit ? selectedContact.email : "Enter Email"} />
        </div>
       </form>
      </div>
      <div className="modal-footer d-flex gap-3 mt-4">
        <button onClick={()=>setaddContact(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal ">Close</button>
        <button onClick={()=>{
          
          IsEdit ? HandleUpdate(): addContact();
         setaddContact(false)}
         
          
          } type="button" className="btn yellowbutton"> {IsEdit ? "Update" :"Ädd"} Contact</button>
      </div>
    </div>
    </div>
  </div>

</div>
     </>
    )
}
export default AddContactUpdate;

