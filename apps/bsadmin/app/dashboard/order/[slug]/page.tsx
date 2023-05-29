export default function Page({ params }) {
  console.log('params', params)
  return <div>My Post {JSON.stringify(params)}</div>;
}
