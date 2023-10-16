import React from 'react';
import Layout from '../components/Layout/Layout';
import AuthModal from '../components/Modal/authModal';
import ListOfProblems from '../components/ListOfProblems';
const Homepage = () => {
  return (
    <div>
      <Layout>
        <ListOfProblems/>
      </Layout>
    </div>
  );
}

export default Homepage;
