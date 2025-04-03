# coding challenge

- Create a Product Grid Card with color variant swatches
- Create a Product Detail Page template that shows two sets of products on the same page
- BONUS: Create a walk-through video of how to add a new color to the PDP and Product Grid Card and Product Detail Page

Don't be afraid to show off your skills and knowledge of Shopify best practices. Think of the non-technical content manager as your most important customer for the video walkthrough and the engineering team as the audience of your PR.

- 6 hours to complete
- Hiring team is available for support via email
- Request access to the [birdygrey-roost](https://help.shopify.com/en/partners/dashboard/managing-stores/request-access) to get started

## Requirements

- [Shopify](https://birdy-grey-test-store.myshopify.com) Login
- [Homebrew](https://brew.sh/)
- Node
  - [NVM](https://github.com/nvm-sh/nvm) to manage versions
- Ruby
  - [RVM](https://rvm.io/) to manage versions
- Shopify [CLI](https://shopify.dev/docs/themes/tools/cli/install)

### Branching and Pull Requests Management:

- Open one PR per task listed above
- Prefix your branches with `feature/`, `bugfix/`, `hotfix/`, or `refactor/`.
- Name your branch with the title of the Asana ticket.
- Use the PR template always [here’s](https://github.com/birdygrey/theme/pull/2463#issue-2246995997) an example of a great PR Comment).
- If you close a PR, leave a comment explaining the reason.

### Code Quality and Style:

- If your code introduces eslint, formatting, or liquid errors or warnings, fix them before requesting review from your peers.
- Avoid using the word ‘fix’ in the branch name other than in the prefixes as outlined above.
- Use prettier and eslint locally before committing your files.
- Keep your commit messages present tense.

**Suggestions:**

- Comments using JSdoc are strongly encouraged.
- Configure your editor to run eslint and prettier on save.

## Setup

To get started using the theme:

- Install dependencies:
  - run `npm install` to install dependencies
- Launch the theme locally: `npm run dev`
  > Note: to get shopify 2.0 setup you will need to get staff access to the desired Shopify store as well as setup shopify CLI locally.

Shopify CLI Documentation: `https://shopify.dev/apps/tools/cli`.
Shopify CLI Environments Documentation: `https://shopify.dev/docs/themes/tools/cli/environments`.
Shopify CLI Installation Instructions: `https://shopify.dev/apps/tools/cli/installation`.
Required Code Formatter: `https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid`

When using Shopify 2.0 with Shopify CLI, a `config-example.yml` is not required.

Shopify 2.0 uses both `.json` and `.liquid`.

- `json` files allow you to utilize Shop 2.0 sections everywhere.
- `liquid` files can still be used and function the same way as previous Shopify versions.

## Development

**Local**

To run theme locally, `yarn run dev`

When it's time to implement a feature or fix a bug the first step is to create a branch from `main`.

```
$ git checkout -b feature/my-awesome-feature
```

After making changes and previewing them locally, commit the changes and push the branch to github.

```
$ git commit -m "My awesome changes" -a
$ git push origin feature/my-awesome-feature
```

**Submission**

Once you are ready to submit your changes, send a zipped (.zip) version of the codebase to mike.kuerschner@birdygrey.com

## [Tailwind CSS](https://tailwindcss.com/) Notes and Commands

- [Configured](https://markustripp.medium.com/extend-shopify-dawn-theme-with-a-custom-tailwind-css-carousel-section-e3efe3ecf18e) to use `prefix: twcss-` in order to not clash with Dawn’s existing styles

  **Scan Templates and Build CSS:** Run the CLI tool to scan your template files for classes and build your CSS to assets/app.css:

  ```bash
  npx tailwindcss -i ./assets/app-tailwind.css -o ./assets/app.css --watch
  ```
