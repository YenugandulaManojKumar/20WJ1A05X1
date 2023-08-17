import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [uniqueNumbers, setUniqueNumbers] = useState([]);

  const fetchDataAndAddToArray = async (url) => {
    try {
      const response = await axios.get(url);
      const numbers = response.data; // Assuming the API response is an array
      if (Array.isArray(numbers)) {
        setUniqueNumbers((prevNumbers) => [...prevNumbers, ...numbers]);
      } else {
        console.error(Invalid data format from ${url});
      }
    } catch (error) {
      console.error(Error fetching data from ${url}:, error.message);
    }
  };

  const removeDuplicates = (array) => {
    return Array.from(new Set(array));
  };
const fetchAllData = async () => {
    const urls = [
      "http://20.244.56.144/numbers/primes",
      "http://20.244.56.144/numbers/fibo",
      "http://20.244.56.144/numbers/odd",
      "http://20.244.56.144/numbers/rand",
    ];

    const fetchPromises = urls.map((url) => fetchDataAndAddToArray(url));
    await Promise.all(fetchPromises);

    const uniqueNumbersArray = removeDuplicates(uniqueNumbers);
    setUniqueNumbers(uniqueNumbersArray);
  };

  useEffect(() => {
    fetchAllData();
  }, []); // Empty dependency array to run only on mount

 return (
    <div className="App">
      <h1>Unique Numbers</h1>
      <ul>
        {uniqueNumbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;