import "./Contact.css"
import { CgProfile } from 'react-icons/cg'
import { MdDelete } from 'react-icons/md'
import { TbEditCircle } from 'react-icons/tb'


const Contact = ({ setIsEdit, setaddContact, Contacts,setSelectedContact }) => {
  return (
    <>
      <div  className="contact-list" >
      {Contacts?.map((contact) => (
     
       <div className='contactse' key={contact.id}>
          <div  className='contact-card'>
            <div>
              <CgProfile className='profile' />
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
 <MdDelete className="del-btn"/>

</div>
          </div>
        </div> 
     
      ))}
         </div>
    </>
  )
}

export default Contact
