import HomeLayout from "@/layouts/HomeLayout";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <HomeLayout>
      <div className="p-16 max-lg:px-5">
        <h1 className="font-workSansSemiBold text-3xl">Privacy Policy</h1>
        <p className=" mt-2">
          Alpha Quest (&quot;Alpha Quest,&quot; &quot;we,&quot; &quot;us,&quot;
          or &quot;our&quot;) is committed to protecting the privacy and
          personal information of our users. This Privacy Policy describes how
          we collect, use, and share information when you use our website or
          services.
        </p>

        <p className=" mt-2">1. Information We Collect</p>
        <p className=" mt-2">
          2. When you use Alpha Quest, we may collect the following types of
          information: - Personal Information: This may include your name, email
          address, and other contact information you provide us with.
          <br /> - Usage Information: We may collect information about how you
          use Alpha Quest, including your search queries and browsing history.
          <br /> - Technical Information: We may collect information about your
          device and internet connection, such as your IP address, browser type,
          and operating system.
        </p>
        <p className=" mt-2">3. How We Use Your Information</p>
        <p className=" mt-2">
          4. We may use the information we collect for the following purposes:
          <br /> - To provide and improve our services to you.
          <br /> - To communicate with you regarding your use of Alpha Quest.
          <br /> - To analyze and improve our services and offerings.
          <br /> - To comply with legal and regulatory requirements.
        </p>
        <p className=" mt-2">5. Sharing Your Information</p>
        <p className=" mt-2">
          6. We may share your information with third-party service providers
          who perform services on our behalf, such as payment processors,
          customer support, and analytics providers. We may also share your
          information if required by law or if necessary to protect our rights
          or the rights of others.
        </p>
        <p className=" mt-2">7. Cookies and Similar Technologies</p>
        <p className=" mt-2">
          8. We use cookies and similar technologies to enhance your user
          experience and improve our services. Cookies are small data files that
          are placed on your device when you use our website. You can control
          the use of cookies through your browser settings.
        </p>
        <p className=" mt-2">9. Data Security</p>
        <p className=" mt-2">
          10. We take reasonable measures to protect your information from
          unauthorized access, disclosure, alteration, or destruction. However,
          no data transmission over the internet or storage system can be
          guaranteed to be completely secure.
        </p>
        <p className=" mt-2">11. Children’s Privacy</p>
        <p className=" mt-2">
          12. Alpha Quest is not intended for use by children under the age of
          13. We do not knowingly collect or solicit personal information from
          children under the age of 13.
        </p>
        <p className=" mt-2">13. Your Choices</p>
        <p className=" mt-2">
          14. You may choose to opt-out of receiving marketing communications
          from us by following the unsubscribe instructions in any email we send
          you. You may also contact us at{" "}
          <a
            className="text-blue-400 hover:text-blue-500"
            href="mailto:support@alphaquest.io"
          >
            {" "}
            support@alphaquest.io
          </a>{" "}
          to update or delete your personal information.
        </p>
        <p className=" mt-2">15. Changes to this Policy</p>
        <p className=" mt-2">
          16. We may update this Privacy Policy from time to time. We will
          notify you of any material changes by posting the updated Privacy
          Policy on our website or by other means.
        </p>
        <p className=" mt-2">17. Contact Us</p>
        <p className=" mt-2">
          8. If you have any questions or concerns about our Privacy Policy or
          practices, please contact us at{" "}
          <a
            className="text-blue-400 hover:text-blue-500"
            href="mailto:support@alphaquest.io"
          >
            {" "}
            support@alphaquest.io
          </a>
          .
        </p>
      </div>
    </HomeLayout>
  );
};

export default PrivacyPolicy;
