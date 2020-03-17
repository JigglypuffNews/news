function connectHackerNewsAPI() {
  return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(newsItems => newsItems.json())
    .catch(error =>
      console.error('Error in connectHackerNewsAPI function', error)
    );
}

export default connectHackerNewsAPI;
