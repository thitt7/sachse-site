const getEvents = async () => {
    const res = await fetch(`http://localhost:${process.env.PORT}/api/events`);
    return res.json()
  }

export default getEvents;