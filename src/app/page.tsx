export default async function IndexPage() {
  return (
    <main className="min-h-dvh w-full p-8">
      <h1 className="text-4xl font-bold mb-8">Home Page</h1>
      <p className="text-5xl mb-2">Here is a basic page that is not calling in any dynamic data.</p>
      <p>For this to be successful, being very disciplined and committed with structure is key imho.😊</p>
      <p className="mb-4">I find the developer experience with NEXTJS &amp; Sanity CMS one of the best I've tried so far.</p>
      <p className="text-3xl italic text-stone-800 mb-4">Things to consider</p>
      <ul className="list-decimal px-8">
        <li>A CMS driven app/website will not benefit from constant goal post moving.</li>
        <li>Trying to add too much flexibiliy will result in over complication.</li>
        <li>Using the chosen tools as close to the most standard way they can be used will lead to easier team participation &amp; collaboration.</li>
        <li>Initial &amp; ongoing costs for using these platforms.</li>
        <li>Risk assess risk of outages and impact.</li>
        <li>The setup required to allow the 2sf team to collaborate on the project.</li>
        <li>A staging / preview site for any major updates.</li>
        <li>I think this is just how we all work now 😀, but wanted to mention the heavy use of AI when building these things does demand caution.</li>
        <li>By his I'm thinking about if things go wonky and buggy, we might struggle.</li>
      </ul>
    </main>
  );
}