import "./Contact.css"
import { CgProfile } from 'react-icons/cg'
import { MdDelete } from 'react-icons/md'
import { TbEditCircle } from 'react-icons/tb'


const Contact = ({ setIsEdit, setaddContact, Contacts,filterData,setSelectedContact,deleteContact,selectedContact }) => {
  const getColor = (name) => {
  const colors = [
    "#f87171",
    "#60a5fa",
    "#34d399",
    "#fbbf24",
    "#a78bfa",
    "#fb7185",
    "#22c55e",
    "#38bdf8",
  ];

  const index = name?.charCodeAt(0) % colors.length;
  return colors[index];
};
  
  
  
  
  return (
    <>
      <div  className="contact-list" >
      {filterData?.map((contact) => (
     
       <div className='contactse' key={contact.id}>
          <div  className='contact-card'>
            <div className="profile" style={{backgroundColor: getColor(contact.name)}}>
              <p>{contact.name?.charAt(0).toUpperCase()}</p>
              
            
            </div>
            <div className='content'>
              <p className='name'>{contact.name}</p>
              <p className='email'>{contact.email}</p>
            </div>

           <div className='icon'>
  <button
    type="button"
    className="edit-btn"
    onClick={() => {
      console.log("clicked", contact.name);

      setSelectedContact(contact);
      setaddContact(true);
      setIsEdit(true);
    }}
  >
    <TbEditCircle />
  </button>
 <MdDelete className="del-btn" onClick={()=>{
  setSelectedContact(contact);
  deleteContact(contact.id);
 }}/>

</div>
          </div>
        </div> 
     
      ))}
         </div>
    </>
  )
}

export default Contact
