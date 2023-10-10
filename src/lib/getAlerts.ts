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
      
      // console.log('URL: ',url)
      // const res = await fetch(url, {
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // // credentials: "same-origin", // include, *same-origin, omit
      // headers: {
      //   "Content-Type": "application/json",
      // },})
      const res = await fetch(url);

      return res.json();
  }

export default getAlerts;