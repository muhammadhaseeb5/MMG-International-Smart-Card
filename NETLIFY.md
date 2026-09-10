# Netlify deployment

The root netlify.toml sets the build command to npm run build:netlify,
the publish directory to dist, and Node.js to version 22.
Connect the main branch and leave the base directory at the repository root.

Run npm ci and npm run build:netlify to build locally.
For a manual deployment, upload the generated dist folder.

The original npm run build targets Sites/Cloudflare Workers, whose server
output cannot be hosted as a static Netlify homepage. The separate Netlify
configuration builds the same React business card with static HTML and assets.
