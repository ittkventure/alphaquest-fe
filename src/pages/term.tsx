import HomeLayout from "@/layouts/HomeLayout";
import React from "react";

const Term = () => {
  return (
    <HomeLayout>
      <div className="p-16 max-md:p-6">
        <h1 className="font-workSansSemiBold text-3xl">Terms & Conditions</h1>
        <p className="">
          By accessing or using Alpha Quest, you agree to be bound by these
          Terms of Service.
        </p>
        <h3 className="font-workSansSemiBold text-2xl mt-4">License</h3>
        <p className="">
          Alpha Quest grants you a limited, non-exclusive, non-transferable, and
          revocable license to use the software and services provided by Alpha
          Quest for personal, non-commercial use.
        </p>

        <h3 className="font-workSansSemiBold text-2xl mt-4">Use of Service</h3>
        <p className="">
          You agree to use Alpha Quest solely for lawful purposes and in
          accordance with these Terms of Service. You will not use Alpha Quest
          in any way that may cause harm to the software, services, or any
          person or entity.
        </p>

        <h3 className="font-workSansSemiBold text-2xl mt-4">
          Intellectual Property
        </h3>
        <p className="">
          All materials and content provided by Alpha Quest, including but not
          limited to software, text, graphics, images, logos, trademarks, and
          service marks, are the property of Alpha Quest or its licensors and
          are protected by applicable intellectual property laws.
        </p>

        <h3 className="font-workSansSemiBold text-2xl mt-4">Data Privacy</h3>
        <p className="">
          Alpha Quest respects your privacy and will not disclose any of your
          personal information or data to any third party without your consent.
          Alpha Quest may collect certain data for internal use, including but
          not limited to usage data and analytics.
        </p>

        <h3 className="font-workSansSemiBold text-2xl mt-4">Disclaimer</h3>
        <p className="">
          Alpha Quest is provided on an &quot;as-is&quot; and &quot;as
          available&quot; basis. Alpha Quest does not guarantee the accuracy,
          completeness, or timeliness of any information or data provided by
          Alpha Quest. Alpha Quest shall not be liable for any damages or losses
          resulting from the use of Alpha Quest.
        </p>

        <h3 className="font-workSansSemiBold text-2xl mt-4">
          Changes to Terms
        </h3>
        <p className="">
          Alpha Quest reserves the right to modify or update these Terms of
          Service at any time without prior notice. Your continued use of Alpha
          Quest following any such changes constitutes your acceptance of the
          revised Terms of Service.
        </p>

        <h3 className="font-workSansSemiBold text-2xl mt-4">Refund Policy</h3>
        <p className="">
          Alpha Quest offers a refund policy within 14 days of purchase. If you
          are not satisfied with the services provided by Alpha Quest, you may
          request a refund by contacting our customer support team at
          <a
            className="text-blue-400 hover:text-blue-500"
            href="mailto:support@alphaquest.io"
          >
            {" "}
            support@alphaquest.io
          </a>
          . Refunds will be issued to the original payment method used for the
          purchase. Please note that Alpha Quest reserves the right to deny any
          refund requests if we suspect misuse or abuse of our services. If you
          have any questions or concerns regarding these Terms of Service,
          please contact us at
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

export default Term;
