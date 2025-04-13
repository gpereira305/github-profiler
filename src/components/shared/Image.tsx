interface imageProps {
  src: string;
  title?: string;
  alt?: string;
  className?: string;
}

export default function Image({ src, title, className }: imageProps) {
  return (
    <img
      src={src}
      alt={title}
      title={title}
      className={className || "w-full h-full object-cover"}
    />
  );
}
