import React, { Fragment, useState, useEffect } from 'react'
import './App.css'

// components
import Navbar from './components/Navbar'
import BookList from './components/BookList'
import Form from './components/Form'

function App() {
  //POST
  const [book, setBook] = useState({
    titulo: '',
    autor: '',
    edicion: 0
  })

  //Get
  const [books, setBooks] = useState([])

  // se esta modificando la tabla
  const [listUpdate, setListUpdate] = useState(false)

  useEffect(() => {
    const getBooks = () => {
      fetch('http://localhost:9000/api')
      .then(res => res.json())
      .then(res => setBooks(res))
    }
    getBooks()
    setListUpdate(false)
  }, [listUpdate])

  return (
    <Fragment>
      <Navbar brand='Library App'/>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{textAlign: 'center'}}>Book List</h2>
            <BookList book={book} books={books} setListUpdate={setListUpdate}/>
          </div>

          <div className="col-5">
            <h2 style={{textAlign: 'center'}}>Book Form</h2>
            <Form book={book} setBook={setBook}/>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App
