import { DefaultNodeTypes, SerializedBlockNode } from "@payloadcms/richtext-lexical";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText as ConvertRichText, JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";

import { SpotifyEmbed, SpotifyEmbedProps } from "@/components/SpotifyEmbed";
import { YouTubeEmbed, YouTubeEmbedProps } from "@/components/YoutubeEmbed";

type RichTextProps = {
  data: SerializedEditorState;
};

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<YouTubeEmbedProps> | SerializedBlockNode<SpotifyEmbedProps>;

export function RichText({ data }: RichTextProps) {
  const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
    ...defaultConverters,
    blocks: {
      youtubeEmbed: ({ node }: { node: SerializedBlockNode<YouTubeEmbedProps> }) => <YouTubeEmbed {...node.fields} />,
      spotifyEmbed: ({ node }: { node: SerializedBlockNode<SpotifyEmbedProps> }) => <SpotifyEmbed {...node.fields} />,
    },
    upload: (props) => <UploadNode {...props} />,
    link: (props) => <LinkNode {...props} />,
  });

  return <ConvertRichText converters={jsxConverters} data={data} />;
}

function UploadNode({ node }: any) {
  const { value } = node;
  if (!value) return null;

  const { url, alt, caption, width, height } = value;

  return (
    <figure>
      <img src={url} alt={alt || ""} width={width} height={height} loading="lazy" />
      {caption && <figcaption className="text-secondary pt-2 text-right text-sm italic">{caption}</figcaption>}
    </figure>
  );
}

function LinkNode({ node, nodesToJSX }: any) {
  const children = nodesToJSX({ nodes: node.children, parent: node });
  const fields = node.fields;

  let href: string | undefined = fields.url;

  if (fields.linkType === "internal" && fields.doc?.value) {
    const docValue = fields.doc.value as any;

    if (typeof docValue.relPermalink === "string") {
      href = docValue.relPermalink;
    } else if (docValue.slug) {
      href = docValue.slug;
    }
  }

  if (!href) return <span>{children}</span>;

  return (
    <a href={href} target={fields.newTab ? "_blank" : undefined} rel={fields.newTab ? "noopener noreferrer" : undefined}>
      {children}
    </a>
  );
}
