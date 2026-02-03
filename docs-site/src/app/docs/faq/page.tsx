import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

const faqs = [
  {
    question: "What is IBM Granite?",
    answer: "Granite is a family of enterprise-grade, open source AI models developed by IBM. These models are designed for various tasks including text generation, code completion, and conversational AI. All Granite models are available under permissive licenses."
  },
  {
    question: "How do I run Granite models locally?",
    answer: "The easiest way to run Granite locally is using Ollama. Install Ollama, then run 'ollama pull granite3.1-dense:8b' to download a model. Use 'ollama run granite3.1-dense:8b' to start chatting interactively."
  },
  {
    question: "What hardware do I need to run Granite?",
    answer: "Requirements depend on the model size. The 2B model needs about 8GB RAM and can run on CPU. The 8B model needs 16GB RAM and benefits from a GPU with 8GB+ VRAM. Larger models require proportionally more resources."
  },
  {
    question: "Are Granite models free to use?",
    answer: "Yes, Granite models are open source and available under the Apache 2.0 license. You can use them freely for personal, commercial, and research purposes."
  },
  {
    question: "How does Granite compare to other models?",
    answer: "Granite models are competitive with similar-sized models from other providers. They excel in enterprise use cases, code generation, and multilingual tasks. Benchmarks are available in the model documentation."
  },
  {
    question: "Can I fine-tune Granite models?",
    answer: "Yes, Granite models can be fine-tuned on your own data. See the Granite Kitchen cookbook for detailed guides on fine-tuning for specific domains and tasks."
  },
  {
    question: "What programming languages does Granite Code support?",
    answer: "Granite Code models support many popular languages including Python, JavaScript, TypeScript, Java, C++, C#, Go, Rust, PHP, Ruby, Swift, and Kotlin."
  },
  {
    question: "How do I report bugs or request features?",
    answer: "Please report issues and feature requests through the GitHub repositories in the IBM Granite Community organization. We welcome community contributions!"
  },
]

export default function FAQPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Common questions about Granite models and how to use them.
        </p>
      </div>
      <Separator />

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="rounded-lg border bg-muted/50 p-6">
        <h3 className="font-semibold mb-2">Still have questions?</h3>
        <p className="text-sm text-muted-foreground">
          Join our community discussions on GitHub or check out the detailed documentation
          for more information.
        </p>
      </div>
    </div>
  )
}
