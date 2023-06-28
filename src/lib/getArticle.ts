const getArticle = async (slug: string) => {
    console.log('getting article');
    const res = await fetch(`http://localhost:${process.env.PORT}/api/news/${slug}`);
    return res.json()
  }

export default getArticle;