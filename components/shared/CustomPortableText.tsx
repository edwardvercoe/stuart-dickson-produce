import { PortableText } from "@portabletext/react";
import { TypedObject } from "sanity";
import Components from "./PortableText/PortableTextComponents";

interface CustomPortableTextProps {
  value: TypedObject | TypedObject[];
  className?: string;
}

export default function CustomPortableText({ value, className }: CustomPortableTextProps) {
  if (!value) {
    return null;
  }

  return (
    <div className={className}>
      <PortableText value={value} components={Components} />
    </div>
  );
}
