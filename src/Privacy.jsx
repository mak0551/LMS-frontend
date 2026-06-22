import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-slate-200">
        <h1 className="text-4xl font-bold mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-slate-700">
          <section>
            <h2 className="font-semibold text-xl mb-2">
              Information We Collect
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Course activity</li>
              <li>Device information</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">
              How We Use Information
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>Provide educational services</li>
              <li>Process payments</li>
              <li>Improve platform functionality</li>
              <li>Provide customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">
              Data Security
            </h2>

            <p>
              We implement industry-standard security measures
              to protect user information.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">
              Cookies
            </h2>

            <p>
              Cookies help us improve user experience, maintain
              login sessions, and analyze usage patterns.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">
              Your Rights
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request corrections</li>
              <li>Request account deletion</li>
              <li>Request data export</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">
              Contact Us
            </h2>

            <p>
              For privacy-related questions, please contact our
              support team.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}