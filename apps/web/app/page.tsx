import { DocumentSchema } from '@repo/shared';

export default function Home() {
  const schemaKeys = Object.keys(DocumentSchema.shape);
  
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">
        Multi-Agent Document System
      </h1>
      <p className="text-gray-600 mb-4">
        Setup validation page
      </p>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-2">Document Schema Fields:</h2>
        <ul className="list-disc list-inside">
          {schemaKeys.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}