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
      { title: 'CLI', href: '/docs/cli' },
      { title: 'SDKs', href: '/docs/sdks' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { title: 'The Concept', href: '/docs/projects/the-concept' },
      { title: 'Limits', href: '/docs/projects/limits' },
      { title: 'Dependencies', href: '/docs/projects/dependencies' },
      { title: 'Models', href: '/docs/projects/models' },
      { title: 'Members', href: '/docs/projects/members' },
      { title: 'Logs', href: '/docs/projects/logs' },
      { title: 'Settings', href: '/docs/projects/settings' },
    ],
  },
  {
    title: 'Classes',
    links: [
      { title: 'The Concept', href: '/docs/classes/the-concept' },
      { title: 'Templates', href: '/docs/classes/templates' },
      { title: 'Instances', href: '/docs/classes/instances' },
      { title: 'Delegate Methods', href: '/docs/classes/delegate-methods' },
      { title: 'Methods', href: '/docs/classes/methods' },
      { title: 'Calling Methods', href: '/docs/classes/calling-methods' },
      { title: 'Tasks & Scheduling', href: '/docs/classes/tasks-scheduling' },
      { title: 'Method Data & Context', href: '/docs/classes/method-data-context' },
    ],
  },
  {
    title: 'Operations',
    links: [
      { title: 'The Concept', href: '/docs/operations/the-concept' },
      { title: 'RDK', href: '/docs/operations/rdk' },
      { title: 'Authentication', href: '/docs/operations/authentication' },
      { title: 'Lookup Keys', href: '/docs/operations/lookup-keys' },
      { title: 'Database', href: '/docs/operations/database' },
      { title: 'Memory', href: '/docs/operations/memory' },
      { title: 'Sorted Sets', href: '/docs/operations/sorted-set' },
      { title: 'File Storage', href: '/docs/operations/file-storage' },
      { title: 'Static IP Calls', href: '/docs/operations/static-ip-calls' },
      { title: 'Deployment', href: '/docs/operations/deployment' },
      { title: 'Caching', href: '/docs/operations/caching' },
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
