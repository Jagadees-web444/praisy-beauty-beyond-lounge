PRAISY CINEMATIC WEBSITE — VISIBLE MEDIA FIX

IMPORTANT: To see the new About and Signature Treatments videos/quotes, open this extracted project folder in VS Code. Do not keep running the older folder (for example F:\New folder (2)).

RUN:
1. Extract this ZIP into a NEW folder.
2. In VS Code, choose File > Open Folder and select that newly extracted folder.
3. Open Terminal > New Terminal.
4. Run: npm install
5. After install completes, run: npm run dev
6. Open the Local URL shown by Vite, usually http://localhost:5173. If it selects another port, use the port shown in the terminal.

ABOUT SECTION:
- Video: public/videos/praisy-about-hair.mp4
- Poster: public/images/about-hair-poster.jpg
- Tamil quote is separate HTML text: “அழகு என்பது தோற்றம் மட்டுமல்ல; அது ஒரு உணர்வு.”

SIGNATURE TREATMENTS / BRIDAL SECTION:
- Video: public/videos/praisy-bridal-signature.mp4
- Poster: public/images/bridal-signature-poster.jpg
- Tamil quote: “அழகாய் ஒரு தொடக்கம்.”

The About and bridal media blocks are deliberately not hidden behind scroll-reveal clipping, so their poster/video and quote remain visible even if the reveal observer does not trigger.

Existing hero, middle, and bottom videos remain separate and unchanged.

If npm install fails, do not close this project. Take a screenshot of the terminal error and troubleshoot from that exact message.


BOOKING FLOW (PRAISY CONCIERGE):
- All Book / Enquire buttons open the booking dialog. Service-card buttons preselect that service.
- The form collects customer name, contact number, service, preferred date and time. Bridal services reveal event type, event date and party-size fields.
- The visitor reviews the details before continuing to WhatsApp. The message is pre-filled; the visitor must press Send in WhatsApp. An appointment is not confirmed until PRAISY replies.
- To route directly to the salon, open src/config.ts and set salonConfig.whatsappNumber to the verified WhatsApp number in international format using digits only (for India, start with 91). Do not use a sample number. Until configured, the site opens WhatsApp's recipient picker and the user must choose PRAISY's official contact.
- The Concierge currently provides built-in guided answers for common questions (bridal enquiries, service selection, pricing, availability and rescheduling). It is not yet connected to a live generative-AI model; that requires a server-side API and secret API key, which must not be placed in browser code.

EXISTING VISUALS: The existing cinematic video assets and styling have been retained.


FINAL UPDATE NOTES
- PRAISY WhatsApp booking recipient is configured as +91 63853 80876 in src/config.ts.
- Booking details are placed into a WhatsApp message; the customer must tap Send. This website does not silently save appointments to a database.
- The Concierge currently uses guided keyword-based replies. It is not connected to a live generative AI API or a booking database.
- Gallery spa image has been upscaled from the original asset; the original scene/composition is retained.
- Sample review cards are clearly labelled as samples and must not be represented as verified customer testimonials.


FINAL MOBILE PERFORMANCE + FOOTER UPDATE
- Mobile-specific, muted 854x480 H.264 video encodes are included beside the original videos (*-mobile.mp4). Desktop video assets remain unchanged.
- Ambient videos mount only while their section is in view; when the section leaves the viewport, the video element is removed and playback stops. Poster images remain as the visual fallback, including when reduced motion is enabled or video playback fails.
- Mobile video preload is disabled until the section is visible, reducing unnecessary downloads and simultaneous video decoding.
- Footer typography now has a clearer heading/content hierarchy and larger, mobile-friendly links and bottom text.
- Instagram, Facebook and YouTube icon links are displayed in the Follow section. Replace the blank instagramUrl, facebookUrl and youtubeUrl values in src/config.ts with PRAISY's real profile URLs when available. Until then, the icons point back to the Follow section as placeholders.
- Vite is configured for 0.0.0.0 and trycloudflare.com hosts so the site can be previewed through a Cloudflare Quick Tunnel.
