import { PortableTextReactComponents } from "@portabletext/react";

const Components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => <h2 className="h2 my-4 py-2">{children}</h2>,
    h2: ({ children }) => <h2 className="h4 my-4 py-2">{children}</h2>,
    h3: ({ children }) => <h3 className="h4 my-4 py-2">{children}</h3>,
    h4: ({ children }) => <h4 className="h4 my-4 py-2">{children}</h4>,
    h5: ({ children }) => <h5 className="h4 my-4 py-2">{children}</h5>,
    normal: ({ children }) => <p className="my-3 py-2">{children}</p>,
    larger: ({ children }) => <p className="my-3 py-2 text-lg">{children}</p>,
    smallUnderline: ({ children }) => (
      <p className="border-b border-lightGrey pb-3 text-sm">{children}</p>
    ),
    blockquote: ({ children }) => (
      // Replace back to blockquote when we have a design
      // <blockquote className="bg-white p-4 my-4 italic rounded-xl">{children}</blockquote>
      <p className="my-3 py-2">{children}</p>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="my-2 ml-4">{children}</ul>,
    number: ({ children }) => <ol className="my-2 ml-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2 ml-4 list-disc">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-2 ml-4 list-decimal">{children}</li>
    ),
  },
};

export default Components;
