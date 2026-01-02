/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface FaqViewModel {
  faqs: FaqItem[];
  categories: string[];
}

export class FaqPresenter {
  constructor(private readonly supabase: any) {}

  async getViewModel(): Promise<FaqViewModel> {
    // Static FAQ data
    const faqs: FaqItem[] = [
      { category: "General", question: "What is Design Kit?", answer: "Design Kit is a marketplace for premium UI components." },
      { category: "General", question: "How do I get started?", answer: "Simply browse our components, add to cart, and checkout." },
      { category: "Pricing", question: "Are there free components?", answer: "Yes! We have many free components available." },
      { category: "Pricing", question: "What payment methods do you accept?", answer: "We accept all major credit cards and PayPal." },
      { category: "Licensing", question: "Can I use components in commercial projects?", answer: "Yes, all components come with a commercial license." },
      { category: "Licensing", question: "How many projects can I use a component in?", answer: "Unlimited projects with a single purchase." },
      { category: "Support", question: "How do I get support?", answer: "Contact us through the contact page or email support@designkit.com." },
      { category: "Support", question: "Do you offer refunds?", answer: "Yes, we offer a 30-day money-back guarantee." },
    ];

    const categories = ["All", ...new Set(faqs.map(f => f.category))];

    return { faqs, categories };
  }

  generateMetadata() {
    return {
      title: "FAQ | Design Kit",
      description: "Frequently asked questions about Design Kit.",
    };
  }
}
