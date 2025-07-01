import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer'id='footer'>
        <div className='footer-content'>
            <div className="footer-left">
                <img className='logo' src={assets.logo_bottom} alt="" />
                <p>Food Prep is a full-stack project that is designed to learn full-stack development. </p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
             </div>
                <div className="footer-center">
                    <h2>Company</h2>
                    <ul>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Careers</li>
                        <li>Blog</li>
                    </ul>
                </div>
                    <div className="footer-right">
                        <h2>Get in touch</h2>
                        <ul>
                            <li>+91 1234567890</li>
                            <li>enquiry@faceprep.in</li>
                        </ul>
                    </div>     
            </div>
            <hr />
            <p className='footer-copyright'>Copyright © 2024 FoodPrep. All rights reserved.</p>
    </div>
  )
}

export default Footer