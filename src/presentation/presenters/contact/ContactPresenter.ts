/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ContactViewModel {
  email: string;
  phone: string;
  address: string;
  socialLinks: { name: string; url: string; icon: string }[];
}

export class ContactPresenter {
  constructor(private readonly supabase: any) {}

  async getViewModel(): Promise<ContactViewModel> {
    return {
      email: "support@designkit.com",
      phone: "+1 (555) 123-4567",
      address: "123 Design Street, San Francisco, CA 94102",
      socialLinks: [
        { name: "Twitter", url: "https://twitter.com/designkit", icon: "🐦" },
        { name: "GitHub", url: "https://github.com/designkit", icon: "🐙" },
        { name: "Discord", url: "https://discord.gg/designkit", icon: "💬" },
      ],
    };
  }

  generateMetadata() {
    return {
      title: "Contact Us | Design Kit",
      description: "Get in touch with the Design Kit team.",
    };
  }
}
