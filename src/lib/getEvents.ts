function urlConcat (url: string, query: string, name: string) {
	return url.concat(`${name}=${query}&`)
}

async function getEvents(id?: string, date?: string, limit?: string, offset?: string) {
  let url = `http://localhost:${process.env.PORT}/api/events?`;
  id ? url = urlConcat(url, id, 'id') : ''
  date ? url = urlConcat(url, date, 'date') : ''
  limit ? url = urlConcat(url, limit, 'limit') : ''
  offset ? url = urlConcat(url, offset, 'offset') : ''
  
  const res = await fetch(url)
  return res.json();
}

export default getEvents;