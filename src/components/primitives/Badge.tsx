export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`w-fit h-fit p-2 ${className}`}>{children}</div>;
}
