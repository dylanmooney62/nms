import React from 'react';
import Layout from '../components/Layout';

const withSidebar = (Component) => {
  return (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

export default withSidebar;
