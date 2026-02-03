import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function EmbeddingsAPIPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge>POST</Badge>
          <Badge variant="outline">/v1/embeddings</Badge>
        </div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Embeddings
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Generate vector embeddings for semantic search and similarity.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Overview
        </h2>
        <p className="leading-7">
          Embeddings convert text into numerical vectors that capture semantic meaning.
          Use embeddings for semantic search, clustering, classification, and retrieval-augmented generation (RAG).
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Request
        </h2>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`POST /v1/embeddings
Content-Type: application/json

{
  "model": "granite-embedding",
  "input": "The quick brown fox jumps over the lazy dog"
}`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Response
        </h2>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [0.0023, -0.009, 0.015, ...],
      "index": 0
    }
  ],
  "model": "granite-embedding",
  "usage": {
    "prompt_tokens": 9,
    "total_tokens": 9
  }
}`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Example: Semantic Search
        </h2>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`import numpy as np
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

def get_embedding(text):
    response = client.embeddings.create(
        model="granite-embedding",
        input=text
    )
    return response.data[0].embedding

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Create embeddings for documents
documents = [
    "Python is a programming language",
    "Machine learning uses algorithms",
    "The weather is sunny today"
]
doc_embeddings = [get_embedding(doc) for doc in documents]

# Search for similar documents
query = "coding in Python"
query_embedding = get_embedding(query)

# Find most similar document
similarities = [cosine_similarity(query_embedding, doc_emb) for doc_emb in doc_embeddings]
most_similar_idx = np.argmax(similarities)
print(f"Most similar: {documents[most_similar_idx]}")`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
