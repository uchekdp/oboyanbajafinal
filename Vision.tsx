import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-luxury-white min-h-screen">
      <section className="bg-charcoal text-white pt-40 pb-20 relative overflow-hidden mb-12">
        <div className="container-custom max-w-4xl relative z-10 px-6">
          <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-4">Legal</span>
          <h1 className="text-4xl md:text-5xl font-serif">Privacy Policy</h1>
        </div>
      </section>

      <div className="container-custom max-w-4xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-gray-600 space-y-8 font-light leading-relaxed">
            <p className="text-sm">Last updated: April 2026</p>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">1. Information We Collect</h2>
              <p>
                Oboyanbaja Investments Nig Ltd values your privacy. We may collect personal information such as your name, email address, phone number, and physical address when you register on our website, subscribe to our newsletter, fill out an inquiry form, or interact with our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">2. How We Use Your Information</h2>
              <p className="mb-2">We use the collected information to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide and maintain our real estate services and client communications.</li>
                <li>Process transactions and send related information, including purchase confirmations and invoices.</li>
                <li>Respond to your comments, questions, and requests and provide customer support.</li>
                <li>Send you updates, security alerts, and administrative messages.</li>
                <li>Communicate with you about new properties, investment opportunities, and events (you may opt out at any time).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">4. Data Security</h2>
              <p>
                We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">5. Third-Party Websites</h2>
              <p>
                You may find advertising or other content on our website that links to the sites and services of our partners, suppliers, advertisers, sponsors, licensors, and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">6. Changes to this Privacy Policy</h2>
              <p>
                Oboyanbaja Investments Nig Ltd has the discretion to update this privacy policy at any time. When we do, we will post a notification on the main page of our website and revise the updated date at the top of this page. We encourage users to frequently check this page for any changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">7. Contacting Us</h2>
              <p>
                If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at oboyanbaja@gmail.com.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
