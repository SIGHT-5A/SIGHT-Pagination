import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [inputPage, setInputPage] = useState('');

  const limit = 5;

  useEffect(() => {
    fetch(`http://localhost:2710/users?page=${currentPage}&limit=${limit}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.result);
        setLastPage(data.last_available_page);
        setTotalPages(data.next ? data.next.page : currentPage);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Access the user's input value from the inputPage state
    const newPage = parseInt(inputPage);

    // Check if the new page is within valid bounds and handle it as needed
    if (newPage > 0 && newPage <= lastPage) {
      setCurrentPage(newPage);
    } else {
      // Handle the case of an invalid page input
      toast.error('Invalid page request', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };


  return (
    <div className="App">
      <h1>User Pagination</h1>
      <div className="user-cards">
        {users.map((user) => (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',

          }} key={user.id} className="user-card">
            <h2 style={{ margin: 10 }}>ID: {user.id}</h2>
            <p> Name: {user.name}</p>
          </div>
        ))}
      </div>

      <div className='searchPage'>
        <form onSubmit={handlePageSearchSubmit}>
          <input
            type="text"
            placeholder='Enter Page Number'
            value={inputPage} // Bind the inputPage state
            onChange={(e) => setInputPage(e.target.value)} // Update the inputPage state
          />
          <input type="submit" value="GO" />
        </form>
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button onClick={() => handlePageChange(currentPage)}>{currentPage} / {lastPage}</button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;

