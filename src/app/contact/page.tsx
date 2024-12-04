"use client";

import React from 'react';
import { motion } from "framer-motion";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import ContactForm from '@/components/form/contact-form';
import WorldMap from '@/components/ui/world-map';


const ContactPage = () => {
  const words = "Get in Touch";
  const description = "Have a question or want to work together? Drop me a message!";

  const contactInfo = [
    {
      icon: <IconMail className="w-6 h-6" />,
      title: "Email",
      content: "hello@example.com",
      link: "mailto:hello@example.com"
    },
    {
      icon: <IconPhone className="w-6 h-6" />,
      title: "Phone",
      content: "+1 (555) 000-0000",
      link: "tel:+15550000000"
    },
    {
      icon: <IconMapPin className="w-6 h-6" />,
      title: "Location",
      content: "San Francisco, CA",
      link: "https://maps.google.com"
    }
  ];

  const mapDots = [
    {
      start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
      end: { lat: 40.7128, lng: -74.0060, label: "New York" }
    },
    {
      start: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" }
    },
    {
      start: { lat: 41.8781, lng: -87.6298, label: "Chicago" },
      end: { lat: 48.8566, lng: 2.3522, label: "Paris" }
    },
    {
      start: { lat: 51.5074, lng: -0.1278, label: "London" },
      end: { lat: 28.6139, lng: 77.2090, label: "New Delhi" }
    },
    {
      start: { lat: 51.5074, lng: -0.1278, label: "London" }, 
      end: { lat: 12.9716, lng: 77.5946, label: "Bangalore" }
    }
  ];

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-200">
            {words}
          </h1>
          <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* World Map
        <div className="mb-20">
          <WorldMap dots={mapDots} lineColor="#06b6d4" />
        </div> */}

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="block p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-emerald-500">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-200">{info.title}</h3>
                    <p className="text-neutral-400">{info.content}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
         {/* World Map */}
              <div className="mt-20">
                <WorldMap dots={mapDots} lineColor="#06b6d4" />
              </div>
      </div>
    </main>
  );
};

export default ContactPage;