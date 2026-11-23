# शुभ विवाह निमंत्रण (groom side)

A mobile-first wedding invitation. Plain HTML, CSS and JavaScript. No build step.

## Change the content
Edit **`invite.config.js`** only: names, dates, places, family lists, wording.
Leave a list empty and that block disappears. Add phone numbers to `contacts`
(for example `{ label: "श्री भीष्म नारायण पाठक", phone: "98XXXXXXXX" }`).

## Change the look
`css/tokens.css` holds the colours (sindoor red, haldi yellow), fonts and spacing.

## Pictures and sound
Put images in `assets/img/` and name them in `invite.config.js`. Use transparent
WebP or PNG, about 900 px wide. The bhajan is `assets/audio/bhajan.mp3`.

## Publish
Upload the whole folder to GitHub, then turn on Pages (Settings, Pages, branch main).
Or drag the folder onto Netlify. Share the link on WhatsApp.

## Make a bride-side card
Copy the folder, set `side: "bride"` in the config, and replace the family details.

## Put it online for free (Netlify, about 5 minutes)

1. Unzip `vivah-groom.zip` on a computer.
2. Open https://app.netlify.com/drop and drag the `vivah-groom` folder onto the page. You get a live link immediately.
3. Sign up for free and click **Claim** within an hour, or the site is deleted.
4. In Netlify: **Site configuration → Change site name** → `sumantwedsnikita`. The link becomes https://sumantwedsnikita.pages.dev
5. If you pick a different name, replace `sumantwedsnikita.pages.dev` in the two `og:` lines in `index.html` and drop the folder again, so the WhatsApp preview image works.

To update later, drag the folder onto the site's **Deploys** page.

A custom domain (e.g. a `.com`) costs money every year and can be connected later under **Domain management**.

## Video

`sumant-weds-nikita.mp4` is a 1080×1920 recording of the site for WhatsApp status and forwarding.
To re-render after edits: open `index.html?render`, which lets a script step the animation one frame at a time.
