useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;
  const results = [];
  const getPost = async (value) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${value}`, {
        signal,
      });
      results.push(`Success: ${value}`);
    } catch (error) {
      if (error.name === 'AbortError') {
        results.push('API failure');
      }
    } finally {
      console.log('Status', results);
    }
  };
  getPost(1);
  return () => {
    // Cancel the request on unmount
    controller.abort();
  };
}, []);
