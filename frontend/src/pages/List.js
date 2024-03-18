import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const ResponseList = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/entry/entries');
        setResponses(response.data.data); 
      } catch (error) {
        console.error('Error fetching responses:', error);
        // Handle error, show message to the user, etc.
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <Layout>
    <div className="response-list-container">
      <h1 className="response-list-heading">All Responses</h1>
      <table className="response-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Code Language</th>
            <th>Standard Input (stdin)</th>
            <th>Source Code</th>
            <th>Time Of Submission</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={index}>
              <td>{response.username}</td>
              <td>{response.language}</td>
              <td>{response.input}</td>
              <td>{response.source_code.substring(0, 100)}...</td>
              <td>{new Date(response.time_of_submission).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default ResponseList;
