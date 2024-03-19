import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const ResponseList = () => {
  const [responses, setResponses] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [generatedOutput, setGeneratedOutput] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://tuf-production.up.railway.app/api/entry/entries');
        setResponses(response.data.data); 
      } catch (error) {
        console.error('Error fetching responses:', error);
        // Handle error, show message to the user, etc.
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures useEffect runs only once

   // Function to handle click on source code
   const handleSourceCodeClick = (code) => {
    setSelectedCode(code);
    document.body.classList.add('overlay-open');
  };

  const handleInputClick = (input) => {
    setInputData(input);
    document.body.classList.add('overlay-open');
  };

  const handleCloseSourceCode = () => {
    setSelectedCode(null);
    setGeneratedOutput(null);
    setInputData(null);
    document.body.classList.remove('overlay-open');
  };

   // Function to generate output
   const handleGenerateOutput = async () => {
    const dummyOutput = 'Dummy output for testing';
    setGeneratedOutput(dummyOutput);
  };

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
              {/* <td>{response.source_code.substring(0, 100)}...</td> */}
              {/* Add onClick handler to open code display */}
              <td onClick={(event) => {handleSourceCodeClick(response.source_code);handleInputClick(response.input)}} style={{cursor:"pointer"}}>
                  {response.source_code.substring(0, 100)}...
                </td>
              <td>{new Date(response.time_of_submission).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {selectedCode && (
        <div className="source-code-overlay">
          <div className="source-code-box">
            <h2>Full Source Code</h2>
            <pre>{selectedCode}</pre>
            <div>
              <button onClick={handleGenerateOutput}>Generate Output</button>
              <button onClick={handleCloseSourceCode}>Close</button>
            </div>
            {generatedOutput && (
              <div className="generated-output">
                <h3>Std Input</h3>
                <pre>{inputData}</pre>
                <h3>Generated Output</h3>
                <pre>{generatedOutput}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ResponseList;
