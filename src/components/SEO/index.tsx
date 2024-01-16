import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface SEOType {}

const SEO = () => {
  const router = useRouter();
  const isMainPage = router.asPath === "/projects";
  return (
    <Head>
      <title>AlphaQuest - Uncover The Next Big Thing in Crypto Now</title>
      <meta
        name="description"
        content="Be the first to discover the hottest crypto trends and projects with our powerful crypto research tool"
      />

      {!isMainPage && <meta name="robots" content="noindex" />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta
        content="Alpha Quest - Uncover The Next Big Thing in Crypto Now"
        property="og:title"
      />
      <meta
        content="Discover the hottest cryptocurrency projects before they take off with Alpha Quest. Start your 7-day trial for only $9!"
        property="og:description"
      />
      <meta property="og:type" content="website" />
      <meta
        content="https://alphaquest.io/images/thumb.png"
        property="og:image"
      />

      <meta
        content="Alpha Quest - Uncover The Next Big Thing in Crypto Now"
        property="twitter:title"
      />
      <meta
        content="Discover the hottest cryptocurrency projects before they take off with Alpha Quest. Start your 7-day trial for only $9!"
        property="twitter:description"
      />
      <meta
        content="https://alphaquest.io/images/thumb.png"
        property="twitter:image"
      />
      <meta content="summary_large_image" name="twitter:card" />

      <link rel="icon" href="/favicon.ico" />
      {/* <meta name="robots" content="noindex" /> */}
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-L12NY9ZK82"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L12NY9ZK82');
          `,
        }}
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>
  );
};

export default SEO;
