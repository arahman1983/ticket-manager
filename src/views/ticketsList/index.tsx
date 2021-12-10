import { useEffect, useState } from 'react'
import { EmptyTableError, Paging, TicketForm, TicketRow } from '../../components'
import { TicketType } from '../../constants/types'
import { getAllTicketsNumber, getTickets } from '../../services/ticketList'
import styles from './tickets.module.css'


export default function TicketsList(){
  const [ticketList, setTicketList] = useState<TicketType[] | []>([])
  const [ticketsNumber, setTicketsNumber] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [selectedTicket, setSelectedTicket] = useState<TicketType | undefined>()

  const handleFirstPageClick = ():void => setCurrentPage(1)
  const handlePrevPageClick = ():void => setCurrentPage(currentPage - 1)
  const handleNextPageClick = ():void => setCurrentPage(currentPage + 1)
  const handleLastPageClick = ():void => setCurrentPage(Math.ceil(ticketsNumber/10))
  const openForm = ():void => setShowForm(true)
  const closeForm = ():void => setShowForm(false)
  const selectTicket = (ticket:TicketType | undefined):void => setSelectedTicket(ticket)
  const updateCurrentPage = () => {
    getTickets(currentPage).then(tickets => setTicketList(tickets))
  }
  const openForAdd = () => {
    setSelectedTicket(undefined)
    setShowForm(true)
  }

  const handleLastPage = () => {
    getAllTicketsNumber().then(number => {
      setTicketsNumber(number)
      setCurrentPage(Math.ceil(number/10))
    })
  }


  useEffect(() => {
    let mount = true
    if(mount){
      getAllTicketsNumber().then(number => setTicketsNumber(number))
      getTickets(currentPage).then(tickets => setTicketList(tickets))
    }
    return () => {
      mount = false
    }
  }, [currentPage])

  return(
    <div className={styles.container}>
      <div>
        <button onClick={openForAdd} className='btn btn-info'>Add Ticket</button>
      </div>
      {showForm && 
        <TicketForm 
        ticket={selectedTicket} 
        closeForm={closeForm} 
        updateCurrentPage={updateCurrentPage}
        handleLastPage={handleLastPage}
        />}


      <p className="mb-1 mt-5 justify-content-start d-flex"><small>* click on the row to show description</small></p>
      <table className="table">
        <thead>
        <tr>
          <th className={styles.id} scope="">#</th>
          <th scope="col-8">Subject</th>
          <th className="text-center">Priority</th>
          <th className="text-center">Status</th>
          <th className="text-center"></th>
        </tr>
        </thead>
        <tbody>
          {
            ticketList.length > 0
            ? ticketList.map((ticketObj, index) => (
              <TicketRow 
                ticket= {ticketObj} 
                key={index} 
                editTicketHandler={openForm} 
                selectTicket={selectTicket}
                showForm={showForm}
                />
            ))
            : <EmptyTableError />
          }
        </tbody>
      </table>
      <Paging 
        pages={Math.ceil(ticketsNumber/10)} 
        currentPage= {currentPage}
        handleFirstPageClick = {handleFirstPageClick}
        handlePrevPageClick  = {handlePrevPageClick }
        handleNextPageClick  = {handleNextPageClick }
        handleLastPageClick  = {handleLastPageClick }
        />
    </div>
  )
}