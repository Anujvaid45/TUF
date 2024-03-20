import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    language: '',
    input: '',
    source_code: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tuf-production.up.railway.app/api/entry/create', formData);
      console.log(response.data); 
      setFormData({
        username: '',
        language: '',
        input: '',
        source_code: ''
      });
      alert('Form submitted successfully!');
      navigate('/list'); 

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again later.'); 
    }
  };


  return (
    <Layout>
    <form onSubmit={handleSubmit} >
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <label htmlFor="language">Preferred Code Language:</label>
      <select
        id="language"
        name="language"
        value={formData.language_id}
        onChange={handleChange}
        required
      >
        <option value="">Select</option>
        <option value="C++">C++</option>
        <option value="Java">Java</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
      </select>
    
      <label htmlFor="input">Standard Input (stdin):</label>
      <textarea
        id="input"
        name="input"
        value={formData.input}
        onChange={handleChange}
        required
      ></textarea>

      <label htmlFor="source_code">Source Code:</label>
      <textarea
        id="source_code"
        name="source_code"
        value={formData.source_code}
        onChange={handleChange}
        required
      ></textarea>

      <button type="submit">Submit</button>
    </form>
    </Layout>
  );
};

export default Form;
