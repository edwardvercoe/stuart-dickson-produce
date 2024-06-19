// import React from "react";
// import Head from "next/head";
// import { imageBuilder } from "@/sanity/lib/image";

// type HeadSEOProps = {
//   site: any;
//   page: any;
// };

// const HeadSEO = ({ site, page }: HeadSEOProps) => {
//   // return <></>;
//   // set <head> variables
//   if (!site?.seo && !page?.seo) return null;
//   const siteTitle = site?.siteTitle;

//   const metaTitle = page?.seo?.metaTitle || site.seo?.metaTitle;
//   const metaDesc = page?.seo?.metaDesc || site.seo?.metaDesc;

//   const shareTitle = page?.seo?.shareTitle || site.seo?.shareTitle;
//   const shareDesc = page?.seo?.shareDesc || site.seo?.shareDesc;
//   const shareGraphic =
//     page?.seo?.shareGraphic?.asset || site.seo?.shareGraphic?.asset;

//   return (
//     <Head>
//       <meta charSet="utf-8" />
//       <meta httpEquiv="x-ua-compatible" content="ie=edge" />
//       <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       <meta name="format-detection" content="telephone=no" />

//       <title>{metaTitle}</title>
//       {metaDesc && <meta name="description" content={metaDesc} />}

//       {shareTitle && (
//         <>
//           <meta property="og:title" content={shareTitle} />
//           <meta name="twitter:title" content={shareTitle} />
//         </>
//       )}

//       {shareDesc && (
//         <>
//           <meta property="og:description" content={shareDesc} />
//           <meta name="twitter:description" content={shareDesc} />
//         </>
//       )}

//       {shareGraphic && (
//         <>
//           <meta
//             property="og:image"
//             content={imageBuilder
//               .image(shareGraphic)
//               .width(1200)
//               .height(630)
//               .url()}
//           />
//           <meta
//             name="twitter:image"
//             content={imageBuilder
//               .image(shareGraphic)
//               .width(1200)
//               .height(630)
//               .url()}
//           />
//         </>
//       )}

//       <meta property="og:type" content="website" />
//       <meta name="twitter:card" content="summary_large_image" />

//       {siteTitle && <meta property="og:site_name" content={siteTitle} />}
//     </Head>
//   );
// };

// export default HeadSEO;
