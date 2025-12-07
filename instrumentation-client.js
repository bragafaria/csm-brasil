import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  person_profiles: "identified_only",
  autocapture: true,
  capture_pageview: true,
  capture_pageleave: true,
  sanitize_properties: (props) => {
    delete props.password;
    return props;
  },
  session_recording: {
    maskAllInputs: false,
    maskAllText: false,
  },
});
