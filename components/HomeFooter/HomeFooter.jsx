import React from 'react'
import Section from '../UI/Section'

const HomeFooter = () => {
  return (
    <Section styleName="text-linksGrey max-w-4xl">
        <h2 className="hover:underline mb-6"><a href="#">Questions? Contact us.</a></h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <li className="text-xs md:text-sm hover:underline"><a href="#">FAQ</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Help Center</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Account</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Media Center</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Investor Relations</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Jobs</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Ways to Watch</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Terms of Use</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Privacy</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Cookie Preferences</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Corporate Information</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Contact Us</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Speed Test</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Legal Notices</a></li>
          <li className="text-xs md:text-sm hover:underline"><a href="#">Only on Netflix</a></li>
        </ul>
      </Section>
  )
}

export default HomeFooter