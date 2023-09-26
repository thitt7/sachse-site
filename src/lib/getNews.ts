function urlConcat (url: string, query: string, name: string) {
	return url.concat(`${name}=${query}&`)
}

async function getNews(id?: string, limit?: string, offset?: string) {
  // let url: string = '';
  // if (typeof window == 'undefined') {url = `http://${process.env.HOSTNAME}:${process.env.PORT}/api/news?`;}
  // else {url = `/api/news?`;}
  // id ? url = urlConcat(url, id, 'id') : ''
  // limit ? url = urlConcat(url, limit, 'limit') : ''
  // offset ? url = urlConcat(url, offset, 'offset') : ''
  
  // const res = await fetch(url)
  // return res.json();
}

export default getNews;