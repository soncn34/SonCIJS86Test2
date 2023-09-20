import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("");
  const [slug, setSlug] = useState("");
  const [getauthor, setGetauthor] = useState("")
  const [getquotes, setGetquotes] = useState("")

  const getNewQuote = () => {
    fetch("https://api.quotable.io/quotes")
      .then((res) => res.json())
      .then(
        (data) => {
          const dataQuotes = data.results
          const randomNum = Math.floor(Math.random() * dataQuotes.length);
          const randomQuote = dataQuotes[randomNum]
          setQuote(randomQuote.content);
          setAuthor(randomQuote.author);
          setTag(randomQuote.tags);
          setSlug(randomQuote.authorSlug);
        }
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  const getAuthorQuotes = () => {
    fetch(`https://api.quotable.io/quotes?author=${slug}`)
      .then((res) => res.json())
      .then((newData) => {
        const listItems = newData.results.map(item =>
          <li>"{item.content}"</li>
        )
        const thisAuthor = `${author}`
        setGetquotes(listItems)
        setGetauthor(thisAuthor)
      })
      .catch((err) => console.log(err));
  }


  return (
    <div>
      <h1>"{quote}"</h1>
      <div className="author" onClick={getAuthorQuotes}>
        <h2>- {author} -</h2>
        <p>{tag}</p>
      </div>
      <button className="btn" onClick={getNewQuote}>Random quotes</button>
      <h2>{getauthor}</h2>
      <ul className="listQuote">{getquotes}</ul>

    </div>
  )
}

export default App
