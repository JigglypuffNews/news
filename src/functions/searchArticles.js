function SearchArticles(articlesArr) {
  const titles = [];
  for (let i = 0; i < 20; i += 1) {
    const articleID = articlesArr[i];
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${articleID}.json?print=pretty`
    )
      .then(res => res.json())
      .then(res => titles.push(res));
  }
  console.log(titles);

  return titles;
}

export default SearchArticles;
