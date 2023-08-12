const getEvents = async (id?: string) => {
    let res;
    if (id) {res = await fetch(`http://localhost:${process.env.PORT}/api/events?id=${id}`);}
    else {res = await fetch(`http://localhost:${process.env.PORT}/api/events`);}
    return res.json()
  }

export default getEvents;