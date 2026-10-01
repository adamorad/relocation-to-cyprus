/**
 * Newsletter sign-up switch. Off until the form posts to a real email
 * service and the promised checklist exists: until then EmailCapture only
 * wrote the address to the visitor's own localStorage, so nobody received
 * anything. Turning this on shows the footer card and every EmailBox again.
 */
export const NEWSLETTER_ENABLED = false;
