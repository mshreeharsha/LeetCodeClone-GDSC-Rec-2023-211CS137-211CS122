import React from 'react';
import Layout from '../components/Layout/Layout';
import AuthModal from '../components/Modal/authModal';
import FilterHeader from '../components/Layout/FilterHeader';
const Homepage = () => {
  return (
    <div>
      <Layout type="mainHeading">
        <FilterHeader/>
      </Layout>
    </div>
  );
}

export default Homepage;
