# Cloudflare Pages deployment

This business card is a static website. Cloudflare Pages can host it on the Free plan with a custom domain. Domain registration and renewal remain separate costs.

## Build

Use Node.js 22.13 or newer. Run `npm ci`, then `npm run build:static`. Upload `dist` to Cloudflare Pages, or configure Git integration with build command `npm run build:static` and output directory `dist`.

The static build reuses `vite.netlify.config.ts`; despite its historical name, its output is host independent. `public/_headers` preserves the security headers and caches fingerprinted assets on Cloudflare Pages.

## Direct deployment

Sign in with `npx wrangler login`. Create the Pages project once with `npx wrangler pages project create mmg-international-smart-card --production-branch main`. Run `npm run deploy:cloudflare` to build and upload the current site.

## Connect the domain

The current canonical domain is `smart-card-mmginternational.store`. Validate the new Pages preview before changing DNS. For this apex domain, add the domain to the same Cloudflare account and copy all existing DNS records, including mail records. Use the assigned Cloudflare nameservers at the domain registrar. In the Pages project's Custom domains settings, add `smart-card-mmginternational.store` and follow the activation instructions. Do not just create a CNAME without first associating the domain in Pages.

Keep the existing Netlify deployment available until the domain and HTTPS work on Cloudflare. Hosting migration is not complete until the account is authenticated, the site is uploaded, and DNS activation is verified.

References: https://developers.cloudflare.com/pages/configuration/custom-domains/ and https://developers.cloudflare.com/pages/platform/limits/
