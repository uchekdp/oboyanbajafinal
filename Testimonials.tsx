import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <div className="bg-luxury-white min-h-screen">
      <section className="bg-charcoal text-white pt-40 pb-20 relative overflow-hidden mb-12">
        <div className="container-custom max-w-4xl relative z-10 px-6">
          <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-4">Legal</span>
          <h1 className="text-4xl md:text-5xl font-serif">Terms of Service</h1>
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
              <h2 className="text-2xl font-serif text-charcoal mb-4">1. Introduction</h2>
              <p>
                Welcome to Oboyanbaja Investments Nig Ltd ("we," "our," or "us"). By accessing or using our website and services, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">2. Real Estate Services</h2>
              <p>
                We provide real estate consultation, property sales, land sales, property management, and investment advisory. All information provided regarding properties, pricing, and availability is subject to change without notice and must be verified through our official channels.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">3. Investment Portfolios</h2>
              <p>
                Any investment projections, ROI estimates, or historical performance metrics displayed on our platforms are for informational purposes. Real estate investments carry inherent risks, and past performance does not guarantee future results.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">4. Property Transactions</h2>
              <p>
                A transaction is only considered valid and binding upon the execution of official physical or digital contracts and the confirmation of payments into designated Oboyanbaja Investments Nig Ltd corporate bank accounts. We are not liable for payments made to unverified third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">5. Intellectual Property</h2>
              <p>
                The content, design, logos, and materials on this website are the property of Oboyanbaja Investments Nig Ltd and are protected by applicable intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Oboyanbaja Investments Nig Ltd shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of or inability to use our services or website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">7. Amendments</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. We will indicate the date of the latest revision at the top of this page. Your continued use of the service following any changes constitutes acceptance of those changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">8. Contact Information</h2>
              <p>
                For questions regarding these Terms of Service, please contact us at oboyanbaja@gmail.com.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
