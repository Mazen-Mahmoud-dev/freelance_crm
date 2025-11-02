import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const linkGroups = {
    Product: ["Features", "Pricing", "Dashboard", "Sign Up"],
    Resources: ["Docs", "Guides", "Blog", "Community"],
    Company: ["About", "Careers", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service"],
  };

  return (
    <footer className="bg-bg text-primary py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Logo + tagline */}
          <div className="max-w-sm">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Freelance CRM
            </h3>
            <p className="text-muted leading-relaxed">
              Manage your clients, projects, and invoices in one clean, simple dashboard.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-16">
            {Object.entries(linkGroups).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text/90">
                  {title}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-muted hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-border/40"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Freelance CRM. All rights reserved.
          </p>

          <div className="flex gap-5">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-primary transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
