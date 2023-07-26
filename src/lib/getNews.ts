const getNews = async (page: number, limit: number, offset: number) => {
    const res = await fetch(`http://localhost:${process.env.PORT}/api/news?page=${page}&limit=${limit}&offset=${offset}`, { 
        next: { revalidate: 5 }
    });
  
    return res.json();
  }

export default getNews;