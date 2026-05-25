import "./AddContactUpdate.css"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect,useState } from "react";
import { db } from "../firrebase";
import { toast } from "react-toastify";


const AddContactUpdate =({setaddContact,setLoading,IsEdit,setIsEdit,selectedContact,setError,contacts})=>{
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const HandleUpdate =async () =>{
  if(!selectedContact) return;
  if(!email.includes("@gmail.com")){
    toast.error("Email Must End With @gmail.com");
    return;
  }
    if(name.length < 3 ||  name.length >15){
    toast.error("Name length be between 3 to 20");
    return;
  }
  if (!/^[A-Za-z]/.test(name)){
    toast.error("Nmae Should Start From ANy Letter Not With No");
    return;
  }
  if (!/^[A-Za-z]/.test(email)){
    toast.error("Email Should Start From ANy Letter Not With No");
    return;
  }
  try {
    setLoading(true)
      const contactRef = doc(db,"contacts",selectedContact.id);
  await updateDoc(contactRef ,{name,
    email
  });
 
  setName("");
    setEmail("");
     setIsEdit(false) ;
     setLoading(false);
      toast.success(`Successfully Edited ${selectedContact.name}`);
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
    if(name.length < 3 ||  name.length >15){
    toast.error("Name length be between 3 to 20");
    return;
  }
    if (!/^[A-Za-z]/.test(name)){
    toast.error("Nmae Should Start From ANy Letter Not With No");
    return;
  }
  if (!/^[A-Za-z]/.test(email)){
    toast.error("Email Should Start From ANy Letter Not With No");
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
  setLoading(true);
  await addDoc(collection(db,"contacts"),{
    name,
    email
  });
  setName("");
  setEmail("");
  setLoading(false)
  toast.success("Contact Added Sucessfully");
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
        <input value={name} onChange={(e)=>{
       setName(e.target.value);
    }
} type="text" placeholder={IsEdit ? selectedContact.name : "Enter Name"}  />

        <label>Email</label>
     <input value={email} onChange={(e)=>{
     setEmail(e.target.value);
    }
} type="text" placeholder={IsEdit ? selectedContact.email : "Enter Email"} />
        </div>
       </form>
      </div>
      <div className="modal-footer d-flex gap-3 mt-4">
        <button onClick={()=>setaddContact(false)} type="button" className="btn btn-clos" data-bs-dismiss="modal ">Close</button>
        <button onClick={()=>{
          
          IsEdit ? HandleUpdate(): addContact();
       
      
        }
          
          } type="button" className="btn submit-btn"> {IsEdit ? "Update" :"Ädd"} Contact</button>
      </div>
    </div>
    </div>
  </div>

</div>
     </>
    )
}
export default AddContactUpdate;

