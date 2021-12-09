export async function getTickets(page:number){
  try {
    const res = await fetch(`http://localhost:3004/tickets?_page=${page}&_limit=10`)
    const tickets = await res.json()
    return tickets
    
  } catch (error) {
    console.log(`error`, error)
  }
  
}