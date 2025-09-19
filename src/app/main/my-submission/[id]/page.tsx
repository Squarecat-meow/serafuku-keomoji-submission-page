import MySubmissionDetail from "./_components/MySubmissionDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MySubmissionDetail id={id} />;
}
