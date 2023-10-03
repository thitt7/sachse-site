function urlConcat (url: string, query: string, name: string) {
	return url.concat(`${name}=${query}&`)
}

async function getNews(slug?: string, limit?: number, offset?: number) {
  let url: string = '';
  if (typeof window == 'undefined') {url = `${process.env.API_URL}/api/news?`;}
  else {url = `/api/news?`;}
  slug ? url = urlConcat(url, slug, 'id') : ''
  limit ? url = urlConcat(url, limit.toString(), 'limit') : ''
  offset ? url = urlConcat(url, offset.toString(), 'offset') : ''
  
  const res = await fetch(url)
  return res.json();
}

export default getNews;