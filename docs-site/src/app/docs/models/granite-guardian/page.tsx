import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function GraniteGuardianPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge>Safety</Badge>
          <Badge variant="outline">Guardian</Badge>
        </div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Granite Guardian
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Safety-focused models for content moderation and harm detection.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Overview
        </h2>
        <p className="leading-7">
          Granite Guardian models are designed to detect and filter harmful content
          in AI applications. They can be used as a safety layer to screen both
          user inputs and model outputs for potential risks.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Risk Categories
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
              <CardTitle className="text-base">Harm</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Violence, self-harm, dangerous activities, and physical threats.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Shield className="h-8 w-8 text-yellow-500 mb-2" />
              <CardTitle className="text-base">Bias & Toxicity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discriminatory content, hate speech, and offensive language.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle className="text-base">Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                PII exposure, legal risks, and regulatory compliance issues.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="leading-7">
          Use Granite Guardian to screen content:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`from transformers import AutoModelForSequenceClassification, AutoTokenizer

# Load the model
model = AutoModelForSequenceClassification.from_pretrained(
    "ibm-granite/granite-guardian-3.1-2b"
)
tokenizer = AutoTokenizer.from_pretrained(
    "ibm-granite/granite-guardian-3.1-2b"
)

# Check content safety
def check_safety(text):
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model(**inputs)
    # Returns probability scores for each risk category
    return outputs.logits.softmax(dim=-1)

# Example usage
result = check_safety("User message to check")
print(f"Safe: {result[0][0]:.2%}")`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Integration Patterns
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            <strong>Input Screening:</strong> Check user inputs before processing
            with your main AI model to prevent prompt injection and harmful requests.
          </li>
          <li>
            <strong>Output Filtering:</strong> Screen model outputs before displaying
            to users to catch any harmful or inappropriate content.
          </li>
          <li>
            <strong>Continuous Monitoring:</strong> Log and analyze flagged content
            for ongoing safety improvements.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Best Practices
        </h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Use both input and output filtering</p>
                <p className="text-sm text-muted-foreground">
                  Screen both user inputs and model outputs for comprehensive safety.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Set appropriate thresholds</p>
                <p className="text-sm text-muted-foreground">
                  Adjust sensitivity based on your application&apos;s risk tolerance.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Implement graceful handling</p>
                <p className="text-sm text-muted-foreground">
                  Provide helpful messages when content is flagged instead of silent failures.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
