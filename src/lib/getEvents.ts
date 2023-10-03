function urlConcat (url: string, query: string, name: string) {
	return url.concat(`${name}=${query}&`)
}

async function getEvents(id?: string, now?: boolean, limit?: string, offset?: string) {
  let url: string = '';
  if (typeof window == 'undefined') {url = `${process.env.API_URL}/api/weather?`;}
  else {url = `/api/events?`;}
  id ? url = urlConcat(url, id, 'id') : ''
  now ? url = urlConcat(url, now.toString(), 'date') : ''
  limit ? url = urlConcat(url, limit, 'limit') : ''
  offset ? url = urlConcat(url, offset, 'offset') : ''
  
  const res = await fetch(url)
  return res.json();
}

export default getEvents;