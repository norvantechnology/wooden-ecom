'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function HelpPage() {
  const faqs = [
    {
      question: "What types of wood do you use for your vase lamps?",
      answer: "We use premium hardwoods including oak, maple, and walnut. Each piece is carefully selected for its grain pattern and durability."
    },
    {
      question: "Are your vase lamps compatible with smart bulbs?",
      answer: "Yes, our vase lamps are compatible with standard E26/E27 bulbs, including smart LED bulbs."
    },
    {
      question: "How do I care for my wooden vase lamp?",
      answer: "Dust regularly with a soft cloth. Avoid direct sunlight and excessive moisture. Apply wood conditioner every 6 months."
    },
    {
      question: "Do you offer custom designs?",
      answer: "Yes, we offer custom designs. Contact our design team to discuss your specific requirements."
    },
    {
      question: "What is your warranty policy?",
      answer: "All our vase lamps come with a lifetime warranty against manufacturing defects."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our wooden vase lamps or get in touch with our support team.
          </p>
        </motion.div>

        {/* Quick Contact Options */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: Phone,
              title: "Call Us",
              description: "Speak with our support team",
              action: "(555) 123-4567",
              buttonText: "Call Now"
            },
            {
              icon: Mail,
              title: "Email Support",
              description: "Get help via email",
              action: "support@artisanwoods.com",
              buttonText: "Send Email"
            },
            {
              icon: MessageSquare,
              title: "Live Chat",
              description: "Chat with an expert",
              buttonText: "Start Chat"
            }
          ].map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg p-6 shadow-md text-center"
            >
              <option.icon className="w-8 h-8 text-amber-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              {option.action && (
                <p className="text-amber-900 font-medium mb-4">{option.action}</p>
              )}
              <Button className="bg-amber-900 hover:bg-amber-800 w-full">
                {option.buttonText}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Support Categories */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              title: "Product Care",
              description: "Learn how to maintain your vase lamp",
              link: "/care-guide"
            },
            {
              title: "Shipping Info",
              description: "Track your order and delivery details",
              link: "/shipping"
            },
            {
              title: "Returns & Refunds",
              description: "Our hassle-free return policy",
              link: "/returns"
            },
            {
              title: "Custom Orders",
              description: "Create your perfect vase lamp",
              link: "/custom"
            }
          ].map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}