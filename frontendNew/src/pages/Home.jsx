import React from 'react'
import Hero from '../component/Hero'
import LastestCollection from '../component/LastestCollection'
import OurPolicy from '../component/OurPolicy'
import NewSletterBox from '../component/NewSletterBox'


const Home = () => {
  return (
    <div>
      <Hero/>
      
      <LastestCollection/>
   
      <OurPolicy  />
      <NewSletterBox/>
    </div>
  )
}

export default Home
