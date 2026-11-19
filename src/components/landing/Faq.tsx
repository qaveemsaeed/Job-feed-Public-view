import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faq } from "@/content/landing";
import { SectionHeading } from "./SectionHeading";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
        <Accordion type="single" collapsible className="border-t border-border">
          {faq.items.map((item, i) => (
            <AccordionItem key={item.q} value={`q-${i}`} className="border-border">
              <AccordionTrigger className="py-5 text-base font-medium hover:no-underline md:text-lg [&>svg]:size-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pr-8 text-base leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
