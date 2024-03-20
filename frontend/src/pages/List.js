import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
require('dotenv').config();

const ResponseList = () => {
  const [responses, setResponses] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [inputData, setInputData] = useState(null);
   // eslint-disable-next-line
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);
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

  const handleLanguage = (language) => {
    setSelectedLanguage(language);
    let languageId;
     // eslint-disable-next-line
    switch (language) {
      case 'C++':
        languageId = 52;
        break;
      case 'Java':
        languageId = 62;
        break;
      case 'Python':
        languageId = 71;
        break;
      case 'JavaScript':
        languageId = 63;
        break;
    }
    setSelectedLanguageId(languageId);
  };

  const handleCloseSourceCode = () => {
    setSelectedCode(null);
    setGeneratedOutput(null);
    setInputData(null);
    setSelectedLanguage(null);
    setSelectedLanguageId(null);
    document.body.classList.remove('overlay-open');
  };
  

  // Function to generate output
  const handleGenerateOutput = async () => {
    try {
      const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
          base64_encoded: 'false',
          fields: '*'
        },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
          language_id: selectedLanguageId,
          source_code: selectedCode,
          stdin: inputData
        }
      };

      // Submit the code for execution
      const response = await axios.request(options);
      const token = response.data.token;

      // Poll for the result using the token
      const answerOptions = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: {
          base64_encoded: 'false',
          fields: '*'
        },
        headers: {
          'X-RapidAPI-Key': process.env.KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      };

      // Poll for the result until it's ready
      let resultResponse;
      do {
        resultResponse = await axios.request(answerOptions);
      } while (resultResponse.data.status && resultResponse.data.status.description === 'Processing');

      // Once the result is ready, set the generated output
      if(resultResponse.data.stdout)
      {
      setGeneratedOutput(resultResponse.data.stdout);
      }else{
        setGeneratedOutput(resultResponse.data.stderr);
      }
    } catch (error) {

      console.error('Error generating output:', error);
    }
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
                {/* Add onClick handler to open code display */}
                {/* <td className='source_code' onClick={(event) => { handleSourceCodeClick(response.source_code); handleInputClick(response.input); handleLanguage(response.language) }} style={{ cursor: "pointer" ,textDecoration:'underline'}}>
                  {response.source_code.substring(0, 100)}
                </td> */}
                <td className='source_code' style={{ cursor: "pointer"}}>
  {response.source_code.substring(0, 100)}
    <button className='read_more_button' onClick={(event) => { handleSourceCodeClick(response.source_code); handleInputClick(response.input); handleLanguage(response.language) }}>
      Read More
    </button>
  
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
            <h2>Full source Code in {selectedLanguage}</h2>
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
