function urlConcat (url: string, query: string, name: string) {
	return url.concat(`${name}=${query}&`)
}

const getAlerts = async (id?: string, page?: number, limit?: number, offset?: number) => {
      let url: string = '';
      if (typeof window == 'undefined') {url = `${process.env.API_URL}/api/alerts?`;}
      else {url = `/api/alerts?`;}
      id ? url = urlConcat(url, id, 'id') : ''
      limit ? url = urlConcat(url, limit.toString(), 'limit') : ''
      offset ? url = urlConcat(url, offset.toString(), 'offset') : ''
      
      const res = await fetch(url)
      return res.json();
  }

export default getAlerts;