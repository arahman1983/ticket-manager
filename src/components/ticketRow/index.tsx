import { useState } from "react"
import { TicketType } from "../../constants/types"
import styles from './ticketRow.module.css'

type Props = {
  ticket: TicketType
}


export default function TicketRow({ ticket }:Props) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const { id, Subject, Priority, Status, Description } = ticket
  
  const toggleActive = (): void => setIsActive(!isActive)
  return (
    <>
      <tr className={`${styles.mainRow} ${isActive ? styles.active : ''}`} onClick={toggleActive}>
        <td>{id}</td>
        <td>{Subject}</td>
        <td className="text-center">
          {
            Priority === 1 
              ? <small className="text-danger">• High</small>
              : Priority === 2
              ? <small className="text-info">• Medium</small>
              : <small className="text-warning">• Low</small>
          }
        </td>
        <td className={styles.status}>
          {
            Status === 1 
              ? <small className="bg-info">TO DO</small>
              : Status === 2
              ? <small className="bg-warning">In Progress</small>
              : <small className="bg-success">Done</small>
          }
        </td>
        <td></td>
      </tr>
      {
        isActive &&
        <tr className={styles.description}>
          <td colSpan={5} className="px-0">
            <p className="px-5 my-0">
              <b>Description</b><br />
              {Description}
            </p>
          </td>
        </tr>
      }
    </>
  )
}