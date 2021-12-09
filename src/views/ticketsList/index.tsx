import { useEffect, useState } from 'react'
import { EmptyTableError, TicketRow } from '../../components'
import { TicketType } from '../../constants/types'
import { getTickets } from '../../services/getTicketList'
import styles from './tickets.module.css'


export default function TicketsList(){
  const [ticketList, setTicketList] = useState<TicketType[] | []>([])

  useEffect(() => {
    getTickets(2).then(tickets => setTicketList(tickets))
  }, [])

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
    </div>
  )
}