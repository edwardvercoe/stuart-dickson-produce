import { PortableTextReactComponents } from '@portabletext/react'

// Email regex pattern
const EMAIL_PATTERN = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g

// Function to wrap email addresses in spans
const wrapEmailsInText = (text: string) => {
  const parts = text.split(EMAIL_PATTERN)
  return parts.map((part, i) => {
    if (part.match(EMAIL_PATTERN)) {
      return (
        <span key={i} className="mailto">
          {part}
        </span>
      )
    }
    return part
  })
}

// Process children for emails
const processChildren = (children: React.ReactNode) => {
  if (typeof children === 'string') {
    return wrapEmailsInText(children)
  }
  if (Array.isArray(children)) {
    return children.map((child, index) => {
      if (typeof child === 'string') {
        return wrapEmailsInText(child)
      }
      return child
    })
  }
  return children
}

const Components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h2 className="h2 my-4 py-2">{processChildren(children)}</h2>
    ),
    h2: ({ children }) => (
      <h2 className="h4 my-4 py-2">{processChildren(children)}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="h4 my-4 py-2">{processChildren(children)}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="h4 my-4 py-2">{processChildren(children)}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="h4 my-4 py-2">{processChildren(children)}</h5>
    ),
    normal: ({ children }) => (
      <p className="my-3 py-2">{processChildren(children)}</p>
    ),
    larger: ({ children }) => (
      <p className="my-3 py-2 text-lg">{processChildren(children)}</p>
    ),
    smallUnderline: ({ children }) => (
      <p className="border-b border-lightGrey pb-3 text-sm">
        {processChildren(children)}
      </p>
    ),
    blockquote: ({ children }) => (
      // Replace back to blockquote when we have a design
      // <blockquote className="bg-white p-4 my-4 italic rounded-xl">{children}</blockquote>
      <p className="my-3 py-2">{processChildren(children)}</p>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-2 ml-4">{processChildren(children)}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-2 ml-4">{processChildren(children)}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2 ml-4 list-disc">{processChildren(children)}</li>
    ),
    number: ({ children }) => (
      <li className="mb-2 ml-4 list-decimal">{processChildren(children)}</li>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-brand-orange hover:underline"
        >
          {children}
        </a>
      )
    },
  },
}

export default Components
