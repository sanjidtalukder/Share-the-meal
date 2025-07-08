import React from 'react';
import Banner from '../Banner';
import FeaturedDonations from '../FeaturedDonations';
import LatestCharityRequests from '../LatestCharityRequests';
import ImpactStats from '../ImpactStats';
import CommunityStories from '../CommunityStories';

const Home = () => {
    return (
        <div>
             <Banner />
      <FeaturedDonations />
      <LatestCharityRequests />
      <ImpactStats />
      <CommunityStories />
        </div>
    );
};

export default Home;