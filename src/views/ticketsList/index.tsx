import { useEffect, useState } from 'react'
import { EmptyTableError, Paging, TicketRow } from '../../components'
import { TicketType } from '../../constants/types'
import { getAllTicketsNumber, getTickets } from '../../services/getTicketList'
import styles from './tickets.module.css'


export default function TicketsList(){
  const [ticketList, setTicketList] = useState<TicketType[] | []>([])
  const [ticketsNumber, setTicketsNumber] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleFirstPageClick = () => setCurrentPage(1)
  const handlePrevPageClick = () => setCurrentPage(currentPage - 1)
  const handleNextPageClick = () => setCurrentPage(currentPage + 1)
  const handleLastPageClick = () => setCurrentPage(Math.ceil(ticketsNumber/10))

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
      

      <table className="table mt-5">
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
              <TicketRow ticket= {ticketObj} key={index} />
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