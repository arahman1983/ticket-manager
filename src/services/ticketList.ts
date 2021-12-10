import { TicketType } from "../constants/types"

export async function getTickets(page:number){
  try {
    const res = await fetch(`http://localhost:3004/tickets?_page=${page}&_limit=10`)
    const tickets = await res.json()
    return tickets
    
  } catch (error) {
    console.log(`error`, error)
  }
}

export async function getAllTicketsNumber() {
  try {
    const res = await fetch(`http://localhost:3004/tickets`)
    const tickets = await res.json()
    return tickets.length
    
  } catch (error) {
    console.log(`error`, error)
  }
}


export async function updateTicket(ticket: TicketType) {
  try {
    const res = await fetch(`http://localhost:3004/tickets/${ticket.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    })
    const result = await res.json()
    console.log(`res`, result)
    return result
  } catch (error) {
    console.log(`error`, error)
  }
  
}


export async function addTicket(ticket: TicketType) {
  try {
    const res = await fetch(`http://localhost:3004/tickets`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    })
    const result = await res.json()
    console.log(`res`, result)
    return result
  } catch (error) {
    console.log(`error`, error)
  }
  
}