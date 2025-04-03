'use client';

import React, { useState } from 'react';
import { TestimonialSlider } from './TestimonialSlider';
import { testimonials } from '../../data/testimonials';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">What Our <span className="text-primary">Customers</span> Say</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Discover why our customers trust ApotheCare for their health and wellness needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <TestimonialSlider testimonials={testimonials} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center">
            <div className="text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Join our community of satisfied customers</h3>
            <p className="text-gray-600 text-center mb-6">
              Experience the ApotheCare difference with our premium quality health products backed by scientific research.
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full bg-${['primary', 'blue', 'green', 'purple', 'amber'][i]}-${i === 0 ? 'DEFAULT' : '500'} ring-2 ring-white flex items-center justify-center text-white font-bold text-xs`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-gray-600 ml-3">
                <div className="font-semibold">4.8 out of 5</div>
                <div className="text-sm">Based on 200+ reviews</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl shadow-md p-8 flex flex-col items-start justify-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4 w-full">
              {[
                {q: "How are your supplements manufactured?", a: "All ApotheCare products are manufactured in FDA-registered facilities following GMP standards."},
                {q: "Are your products tested for quality?", a: "Yes, every batch undergoes rigorous third-party testing for purity and potency."}
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm p-4">
                  <h4 className="font-medium text-gray-800 mb-2">{faq.q}</h4>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
              <button className="text-primary hover:text-primary-dark font-medium flex items-center mt-2">
                View more FAQs
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 