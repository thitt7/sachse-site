const getAlerts = async (page?: number, limit?: number, offset?: number) => {
    // const res = await fetch(`http://${process.env.HOSTNAME}:${process.env.PORT}/api/alerts?page=${page}&limit=${limit}&offset=${offset}`, { 
    //     next: { revalidate: 5 }
    // });
  
    // return res.json();
  }

export default getAlerts;