import React from 'react';

const BookList = ({ book, books, setListUpdate }) => {

    // Delete
    const handleDelete = (id) => {
        const requestInit = {
            method: 'DELETE',
        };
        fetch(`http://localhost:9000/api/${id}`, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))
            .catch(error => console.error('Error:', error));

        setListUpdate(true);
    };

    // Put
    const handleUpdate = (id) => { // Se añadió el parámetro id que falta
        const { titulo, autor, edicion } = book; // Se corrigió el nombre de la variable edicion a edicion (falta una 'i')
        const edicionParsed = parseInt(edicion, 10);

        // validación de los datos
        if (titulo === '' || autor === '' || edicionParsed <= 0) { // Se corrigió edicion a edicionParsed
            alert('Todos los campos son obligatorios');
            return;
        }

        const requestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        };
        fetch(`http://localhost:9000/api/${id}`, requestInit) // Se añadió la variable id que falta
            .then(res => res.text())
            .then(res => console.log(res))
            .catch(error => console.error('Error:', error));

        setListUpdate(true);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Edition</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.titulo}</td>
                        <td>{book.autor}</td>
                        <td>{book.edicion}</td>
                        <td>
                            <div className='mb-3'>
                                <button onClick={() => handleDelete(book.id)} className='btn btn-danger'>Delete</button>
                            </div>
                            <div className='mb-3'>
                                <button onClick={() => handleUpdate(book.id)} className='btn btn-dark'>Update</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BookList;
