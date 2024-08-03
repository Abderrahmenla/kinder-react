// import * as Sentry from '@sentry/nextjs';

// Sentry.init({
//   dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

//   environment: process.env.NEXT_PUBLIC_ENVIRONMENT,

//   // Adjust this value in production, or use tracesSampler for greater control
//   tracesSampleRate: 1,

//   // Setting this option to true will print useful information to the console while you're setting up Sentry.
//   debug: false,

//   replaysOnErrorSampleRate: 1.0,

//   // This sets the sample rate to be 10%. You may want this to be 100% while
//   // in development and sample at a lower rate in production
//   replaysSessionSampleRate: 0.1,

//   // You can remove this option if you're not planning to use the Sentry Session Replay feature:
//   integrations: []
// });

// //Lazy loading replays
// async function lazyLoadReplay() {
//   const { Replay } = await import('@sentry/nextjs');

//   Sentry.addIntegration(
//     new Replay({
//       // Additional Replay configuration goes in here, for example:
//       maskAllText: true,
//       blockAllMedia: true
//     })
//   );
// }
// void lazyLoadReplay();
