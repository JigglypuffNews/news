function SearchArticles(articlesArr, searchTerms) {
  const relevantArticles = [];
  console.log(articlesArr);
  for (let i = 0; i < articlesArr.length; i += 1) {
    let articleID = articlesArr[i];
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${articleID}.json?print=pretty`
    )
      .then(res => res.json())
      .then(res => {
        for (let j = 0; j < searchTerms.length; j += 1) {
          if (res.title.toLowerCase().includes(searchTerms[j]))
            relevantArticles.push(res);
        }
      });
  }
  console.log(relevantArticles);
  return relevantArticles;
}

export default SearchArticles;
