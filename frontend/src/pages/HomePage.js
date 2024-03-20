import React from 'react';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
        <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Code Entry App</h1>
      <p className="homepage-text">
        This is a web application where you can manage and track your code
        submissions.
      </p>
      <p className="homepage-text">
        You can navigate to the list page to view all submitted entries and
        manage them as needed.
      </p>
     
    </div>
        </Layout>
    
    
  );
};

export default HomePage;
