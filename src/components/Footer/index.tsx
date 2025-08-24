'use client'
import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-[#2f3537] text-white px-8 py-16 mt-16 font-sans">
      {/* Grid Columns */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8 m-5">
        {/* Need Help */}
        <div>
          <h4 className="text-lg mb-5">Need Help</h4>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">Contact Us</p>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">Track Order</p>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">Returns & Refunds</p>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">FAQs</p>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">Career</p>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg mb-5">Company</h4>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">About Us</p>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">euphoria Blog</p>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">euphoriastan</p>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">Collaboration</p>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">Media</p>
        </div>

        {/* More Info */}
        <div>
          <h4 className="text-lg mb-5">More Info</h4>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">Term and Conditions</p>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">Privacy Policy</p>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">Shipping Policy</p>
          <p className="text-gray-300 mb-3 text-[0.95rem] cursor-pointer hover:text-white">Sitemap</p>
        </div>

        {/* Location + App Download */}
        <div>
          <h4 className="text-lg mb-5">Location</h4>
          <p className="text-gray-300 mb-3 text-[0.95rem]">support@euphoria.in</p>
          <p className="text-gray-300 mb-3 text-[0.95rem]">Eklingpura Chouraha, Ahmedabad Main Road</p>
          <p className="text-gray-300 mb-3 text-[0.95rem]">(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</p>

          <h4 className="text-lg mt-6 mb-4">Download The App</h4>
          <div className="flex flex-wrap gap-4">
            <Image src="/google-play-badge.png" alt="Google Play" width={150} height={40} className="cursor-pointer" />
            <Image src="/app-store-badge.png" alt="App Store" width={150} height={40} className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex flex-wrap gap-4 mt-6 p-4">
        <Image src="/facebook.png" alt="Facebook" width={48} height={48} className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-600" />
        <Image src="/instagram.png" alt="Instagram" width={48} height={48} className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-600" />
        <Image src="/twitter.png" alt="Twitter" width={48} height={48} className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-600" />
        <Image src="/in.png" alt="LinkedIn" width={48} height={48} className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-600" />
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-700 my-8" />

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400">
        Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
