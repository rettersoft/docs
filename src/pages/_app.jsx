import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'

const navigation = [
  {
    title: 'Introduction',
    links: [
      { title: 'Getting started', href: '/' },
      { title: 'Create a Simple Project', href: '/docs/create-a-simple-project' },
      { title: 'Samples', href: '/docs/samples' },
    ],
  },
  {
    title: 'Project Components',
    links: [
      { title: 'Classes', href: '/docs/project-components/classes' },
      { title: 'Dependencies', href: '/docs/project-components/dependencies' },
      { title: 'Models', href: '/docs/project-components/models' },
    ],
  },
  {
    title: 'Project Settings',
    links: [
      { title: 'Limits', href: '/docs/project-settings/limits' },
      { title: 'Members', href: '/docs/project-settings/members' },
      { title: 'Logs', href: '/docs/project-settings/logs' },
      { title: 'Destinations', href: '/docs/project-settings/destinations' },
      { title: 'Authentication Rules', href: '/docs/project-settings/authentication-rules' },
      { title: 'Environments', href: '/docs/project-settings/environments' },
    ],
  },
  {
    title: 'CLI',
    links: [
      { title: 'Secrets', href: '/docs/cli/secrets' },
      { title: 'Commands', href: '/docs/rdk/commands' },
    ],
  },
  {
    title: 'RDK',
    links: [
      { title: 'Operations', href: '/docs/rdk/operations' },
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
    title: 'Change Log',
    links: [
        { title: 'Versions', href: '/docs/change-log/versions' },
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
