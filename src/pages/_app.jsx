import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'

const navigation = [
  {
    title: 'Retter.io',
    links: [
      { title: 'What is Retter.io?', href: '/' },
      { title: 'Create Your First Project', href: '/docs/first-project' },
      { title: 'FAQ', href: '/docs/faq' },
    ],
  },
  {
    title: 'Components',
    links: [
      { title: 'Projects', href: '/docs/components/projects' },
      { title: 'Classes', href: '/docs/components/classes' },
      { title: 'Dependencies', href: '/docs/components/dependencies' },
      { title: 'Models', href: '/docs/components/models' },
    ],
  },
  {
    title: 'Settings',
    links: [
      { title: 'Members', href: '/docs/settings/members' },
      { title: 'Logs', href: '/docs/settings/logs' },
      { title: 'Destinations', href: '/docs/settings/destinations' },
      { title: 'Authentication Rules', href: '/docs/settings/authentication-rules' },
      { title: 'Environments', href: '/docs/settings/environments' },
      { title: 'Quotas', href: '/docs/settings/quotas' },
    ],
  },
  {
    title: 'CLI',
    links: [
      { title: 'Getting Started', href: '/docs/cli/start' },
      { title: 'Commands', href: '/docs/cli/commands' },
    ],
  },
  {
    title: 'RDK',
    links: [
      { title: 'Operations', href: '/docs/rdk/operations' },
      { title: 'Authentication', href: '/docs/rdk/authentication' },
      { title: 'Method Call', href: '/docs/rdk/instances' },
      { title: 'Database', href: '/docs/rdk/database' },
      { title: 'Lookup Keys', href: '/docs/rdk/lookup-keys' },
      { title: 'Storage', href: '/docs/rdk/storage' },
      { title: 'Memory', href: '/docs/rdk/memory' },
      { title: 'Static IP', href: '/docs/rdk/static-ip-calls' },
      { title: 'MongoDB', href: '/docs/rdk/mongo-db' },
      { title: 'Deployment', href: '/docs/rdk/deployment' },
      { title: 'Cache', href: '/docs/rdk/caching' },
      { title: 'Clean Up', href: '/docs/rdk/delete' },
      { title: 'Bulk Operations', href: '/docs/rdk/bulk' },
    ],
  },
  {
    title: 'SDK',
    links: [
        { title: 'JavaScript', href: '/docs/sdk/javascript' },
        { title: 'IOS', href: '/docs/sdk/ios' },
        { title: 'Android', href: '/docs/sdk/android' },
        { title: 'React Native', href: '/docs/sdk/react-native' },
    ],
  },
  {
    title: 'Samples',
    links: [
        { title: 'Email / Password Auth', href: '/docs/samples/email-password-auth' },
        { title: 'Articles', href: 'https://dev.to/retterio' },
        { title: 'More', href: 'https://github.com/retterio' },
    ],
  },
  {
    title: 'Change Log',
    links: [
        { title: 'Versions', href: '/docs/change-logs' },
    ],
  },
]

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (/^h[23]$/.test(node.name)) {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export default function App({ Component, pageProps }) {
  let title = pageProps.markdoc?.frontmatter.title

  let pageTitle =
    pageProps.markdoc?.frontmatter.pageTitle ||
    `${pageProps.markdoc?.frontmatter.title} - Docs`

  let description = pageProps.markdoc?.frontmatter.description

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Layout
        navigation={navigation}
        title={title}
        tableOfContents={tableOfContents}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
