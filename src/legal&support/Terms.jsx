import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-slate-200">
        <h1 className="text-4xl font-bold mb-8">
          Terms & Conditions
        </h1>

        <div className="space-y-6 text-slate-700">
          <section>
            <h2 className="font-semibold text-xl mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using our platform, you agree to
              comply with these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">
              2. User Accounts
            </h2>
            <p>
              Users are responsible for maintaining the
              confidentiality of their account credentials.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">
              3. Course Access
            </h2>
            <p>
              Course purchases grant access according to the
              specific terms outlined for each course.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">
              4. Payments & Refunds
            </h2>
            <p>
              All payments are processed securely. Refund
              eligibility is subject to our refund policy.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">
              5. Intellectual Property
            </h2>
            <p>
              All content on the platform remains the property
              of the platform or its licensors.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">
              6. Prohibited Activities
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>Sharing account credentials</li>
              <li>Redistributing course content</li>
              <li>Uploading malicious content</li>
              <li>Violating applicable laws</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">
              7. Account Suspension
            </h2>
            <p>
              We reserve the right to suspend or terminate
              accounts that violate these terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}