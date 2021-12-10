import { FormEvent, useState } from 'react'
import { TicketType } from '../../constants/types'
import { addTicket, updateTicket } from '../../services/ticketList'
import styles from './ticketForm.module.css'

type Props = {
  ticket: TicketType | undefined
  closeForm: () => void
  updateCurrentPage: ()=> void
  handleLastPage: ()=>void
}

export default function TicketForm ({ticket, closeForm, updateCurrentPage, handleLastPage}:Props){
  const [subject, setSubject] = useState<string>(ticket ? ticket.Subject : '')
  const [description, setDescription] = useState<string>(ticket ? ticket.Description : '')
  const [priority, setPriority] = useState<number>(ticket ? ticket.Priority : 1)
  const [status, setStatus] = useState<number>(ticket ? ticket.Status : 1)
  const [error, setError] = useState(false)


  const resetForm = ():void => {
    setSubject('')
    setDescription('')
    setPriority(1)
    setStatus(1)
  }

  const HandleCancelForm = ():void => {
    resetForm()
    closeForm()
  }


  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    if(!subject || !description){
      setError(true)
      return false
    }
    setError(false)
    // alert('updateis not implemented to add in db :>> ');
    // resetForm()
    // closeForm()
    ticket ?
    updateTicket({
      id: ticket?.id,
      Subject: subject,
      Priority: priority,
      Status: status,
      Description: description,
    }).then((result)=>{
      updateCurrentPage()
      resetForm()
      closeForm()
    }).catch(()=>{
      return false
    })
    : 
    addTicket({
      Subject: subject,
      Priority: priority,
      Status: status,
      Description: description,
    }).then((result)=>{
      handleLastPage()
      resetForm()
      closeForm()
    }).catch(()=>{
      return false
    })
  }

  const handleSubject = (e:React.FormEvent<HTMLInputElement>):void => {
    const value = e.currentTarget.value
    setSubject(value)
  }
  const handleDescription = (e:React.FormEvent<HTMLTextAreaElement>):void => {
    const value = e.currentTarget.value
    setDescription(value)

  }
  const handlePriority = (e:React.FormEvent<HTMLSelectElement>):void => {
    const value = e.currentTarget.value
    setPriority(Number(value))
  }
  const handleStatus = (e:React.FormEvent<HTMLSelectElement>):void => {
    const value = e.currentTarget.value
    setStatus(Number(value))
  }


  return(
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className="mb-3">
          <label className="form-label">Subject</label>
          <input type="text" className="form-control" maxLength={50} placeholder="Subject" value={subject} onChange={handleSubject} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows={3} maxLength={500} value={description} onChange={handleDescription}></textarea>
        </div>
        <div className="mb-3 d-flex">
            <div className='col-md-6 pe-3'>
                <label className="form-label">Priority</label>
                <select className="form-control" value={priority} onChange={handlePriority}>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
            </div>
            <div className='col-md-6 ps-3'>
                <label className="form-label">Status</label>
                <select className="form-control" value={status} onChange={handleStatus}>
                  <option value={1}>To Do</option>
                  <option value={2}>In Progress</option>
                  <option value={3}>Done</option>
                </select>
            </div>
        </div>
        <div className="mb-3 d-flex">
          <button className='btn btn-primary me-3'>Submit</button>
          <button className='btn btn-secondary' onClick={HandleCancelForm}>Cancel</button>
        </div>
        <div>
          {error && <small className='text-danger justify-content-start d-flex'>Subject and Description are mandatory fields</small>}
        </div>
      </form>
    </div>
  )
}