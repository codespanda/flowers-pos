import { Link } from 'react-router-dom'
import {
  Flower2,
  Sun,
  Moon,
  ArrowRight,
  Code2,
  Zap,
  Palette,
  BarChart3,
  MonitorSmartphone,
  FolderTree,
  Check,
  LayoutGrid,
  ClipboardList,
  Users,
  Tag,
  Settings,
  Bell,
  KeyRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Section } from '@/components/docs/Section'
import { SectionHeading } from '@/components/docs/SectionHeading'
import { useDarkToggle } from '@/hooks/useDarkToggle'
import { ROUTES } from '@/config/routes'
import { APP_CONFIG } from '@/config/app'

const REPO_URL = 'https://github.com/codespanda/flowers-pos'
const LIVE_URL = 'https://flowers.codespanda.com/'

const WHO_ITS_FOR = [
  'Florist and boutique retail owners who want a modern counter without a POS contract',
  'Agencies building retail or checkout demos for clients',
  'Startups prototyping a point-of-sale product before writing backend code',
  'Developers learning cart, coupon, and checkout UX patterns in React',
  'Freelancers who want a polished, retail-flavored template to start from',
]

const WHY_FEATURES = [
  {
    icon: Code2,
    title: 'TypeScript-First',
    description: 'Every component, hook, and util is fully typed — no any escape hatches.',
  },
  {
    icon: Palette,
    title: 'shadcn/ui Components',
    description: 'Built on shadcn/ui and radix-ui primitives — retheme by editing one CSS file.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Fully Responsive',
    description: 'Counter, tablet, and mobile layouts from the same codebase — no separate build.',
  },
  {
    icon: Zap,
    title: 'Vite-Powered Builds',
    description: 'Sub-second HMR in dev and a production bundle that stays under 200 KB gzipped.',
  },
  {
    icon: BarChart3,
    title: 'Zero-Dependency Charts',
    description: 'Revenue and category breakdowns rendered with plain CSS — no chart library weight.',
  },
  {
    icon: FolderTree,
    title: 'Feature-Folder Structure',
    description: 'Each domain — orders, coupons, customers — is self-contained. Add or remove freely.',
  },
]

const MODULES = [
  { icon: LayoutGrid, title: 'POS Counter', route: ROUTES.pos, description: 'Product grid, cart, coupons, and multi-tender checkout.' },
  { icon: ClipboardList, title: 'Orders', route: ROUTES.orders, description: 'Order history with status and payment filters.' },
  { icon: Users, title: 'Customers', route: ROUTES.customers, description: 'Customer directory with spend and order history.' },
  { icon: Tag, title: 'Coupons', route: ROUTES.coupons, description: 'Discount codes with usage caps and expiry tracking.' },
  { icon: BarChart3, title: 'Reports', route: ROUTES.reports, description: 'Revenue trend, top products, and category breakdowns.' },
  { icon: Settings, title: 'Settings', route: ROUTES.settings, description: 'Store profile, tax rate, payment methods, and team.' },
  { icon: Bell, title: 'Notifications', route: ROUTES.notifications, description: 'Order, inventory, and system alerts in one feed.' },
  { icon: KeyRound, title: 'Auth screens', route: ROUTES.login, description: 'Sign in, sign up, and forgot-password, fully designed.' },
]

const TECH_STACK = [
  'React 19',
  'Vite 8',
  'TypeScript',
  'Tailwind CSS v4',
  'shadcn/ui',
  'radix-ui',
  'React Router',
  'next-themes',
  'Lucide Icons',
]

const GALLERY = [
  { file: 'dashboard.png', label: 'POS Counter' },
  { file: 'orders.png', label: 'Orders' },
  { file: 'customers.png', label: 'Customers' },
  { file: 'coupons.png', label: 'Coupons' },
  { file: 'reports.png', label: 'Reports' },
  { file: 'settings.png', label: 'Settings' },
]

const FAQS = [
  {
    question: 'Can I use this in commercial projects?',
    answer:
      'Yes. Marigold & Vine POS is released under the MIT License. Use it in client work, real products, and commercial applications with no attribution required.',
  },
  {
    question: 'Does it include authentication?',
    answer:
      'It ships with fully designed sign in, sign up, and forgot-password screens. Auth is currently a local mock stored in the browser — any email and a 6+ character password works. Wiring up a real provider (Supabase, Firebase, Clerk, Auth.js) takes minutes.',
  },
  {
    question: 'Is checkout connected to a real payment processor?',
    answer:
      "No — it's a UI-only demo. Cart totals, coupon discounts, and tax are calculated client-side against mock data. Wiring Stripe or another processor into the checkout flow is on you.",
  },
  {
    question: 'Can I use it without TypeScript?',
    answer:
      'The template is TypeScript-first. You can rename files to .jsx and strip type annotations, but you lose autocomplete and refactoring safety in the process.',
  },
]

export function ShowcasePage() {
  const { isDark, toggle } = useDarkToggle()

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link to="/docs" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowRight className="size-4 rotate-180" />
            Back to docs
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={toggle}>
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                <Code2 className="size-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <section className="pb-16">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>New</Badge>
            <Badge variant="outline">POS Template</Badge>
            <Badge variant="outline">Free & Open Source</Badge>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-brand-muted text-brand">
              <Flower2 className="size-5.5" />
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{APP_CONFIG.storeName} POS</h1>
          </div>

          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A complete florist counter point-of-sale template covering products, cart, coupons, orders,
            customers, and reports across 10 production-ready pages — built with React, Vite, Tailwind
            CSS, shadcn/ui, and TypeScript.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>MIT License</span>
            <span>·</span>
            <span>Updated July 2026</span>
            <span>·</span>
            <a href={LIVE_URL} target="_blank" rel="noreferrer" className="text-brand hover:underline">
              flowers.codespanda.com
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={LIVE_URL} target="_blank" rel="noreferrer">
                Live Preview
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/docs">Documentation</Link>
            </Button>
          </div>
        </section>

        <div className="flex flex-col gap-16">
          <Section id="what-is-it">
            <SectionHeading eyebrow="About" title={`What is ${APP_CONFIG.storeName} POS?`} />
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                {APP_CONFIG.storeName} POS is a free, open-source React point-of-sale template built for a
                florist counter — but the patterns underneath (product grid, cart, coupon codes, multi-tender
                checkout, order history) apply to any small retail counter. Instead of a pile of isolated UI
                components, you get a fully wired application — real navigation, working page layouts, and
                realistic mock data across every module from day one.
              </p>
              <p>
                Built on shadcn/ui primitives with a design system you can retheme by editing a single CSS
                file. Whether you're launching a real POS product, prototyping for a client, or just learning
                how a checkout flow is put together, this template gives you a production-ready foundation
                without the blank-canvas grind.
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-foreground">Who is it for?</p>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {WHO_ITS_FOR.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section id="gallery">
            <SectionHeading
              eyebrow="Gallery"
              title="See it in action"
              description="A tour of the key modules — every page is production-ready and fully responsive."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY.map((item) => (
                <a
                  key={item.file}
                  href={LIVE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-lg border border-border bg-card"
                >
                  <img
                    src={`/gallery/${item.file}`}
                    alt={item.label}
                    className="aspect-video w-full object-cover object-top transition-transform group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <p className="px-3 py-2 text-sm font-medium text-foreground">{item.label}</p>
                </a>
              ))}
            </div>
            <div className="mt-4">
              <a href={LIVE_URL} target="_blank" rel="noreferrer" className="text-sm font-medium text-brand hover:underline">
                Explore all →
              </a>
            </div>
          </Section>

          <Section id="why">
            <SectionHeading eyebrow="Why this template" title="Built for real projects" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_FEATURES.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-brand-muted text-brand">
                      <feature.icon className="size-4.5" />
                    </span>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </Section>

          <Section id="whats-included">
            <SectionHeading
              eyebrow="What's included"
              title="8 fully built modules"
              description="Every module ships with working layouts, realistic sample data, and full responsiveness."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {MODULES.map((module) => (
                <Link
                  key={module.title}
                  to={module.route}
                  className="flex items-start gap-3 rounded-lg border border-border p-4 hover:bg-muted/50"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand">
                    <module.icon className="size-4.5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{module.title}</p>
                      <Badge variant="outline" className="h-4.5 text-[10px]">
                        Live
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{module.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Section>

          <Section id="tech-stack">
            <SectionHeading eyebrow="Tech stack" title="Built with modern tools" />
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <Badge key={tech} variant="outline" className="h-7 px-3 text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </Section>

          <Section id="documentation">
            <SectionHeading
              eyebrow="Documentation"
              title="Get running in 2 minutes"
              description="Node.js 18+ required. No paid tools, no account sign-ups."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">1. Clone the repo</p>
                  <CodeBlock language="bash" code={`git clone ${REPO_URL}.git`} />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">2. Install dependencies</p>
                  <CodeBlock language="bash" code="npm install" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">3. Start the dev server</p>
                  <CodeBlock language="bash" code="npm run dev" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">4. Open in browser</p>
                  <CodeBlock code="http://localhost:5173" />
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Project structure</p>
                <CodeBlock
                  code={`src/
├─ components/
│  ├─ ui/         # shadcn/ui primitives
│  ├─ layout/     # Sidebar, header, shell
│  └─ reports/    # chart components
├─ pages/         # one file per route
│  ├─ PosPage.tsx
│  ├─ OrdersPage.tsx
│  ├─ ReportsPage.tsx
│  └─ ...
├─ data/          # mock data & types
└─ hooks/         # custom hooks`}
                />
              </div>
            </div>
            <div className="mt-6">
              <Link to="/docs" className="text-sm font-medium text-brand hover:underline">
                Read the full docs →
              </Link>
            </div>
          </Section>

          <Section id="faq">
            <SectionHeading eyebrow="FAQ" title="Common questions" />
            <div className="divide-y divide-border rounded-lg border border-border">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
                    {faq.question}
                    <span className="ml-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Section>

          <Section id="cta">
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <h2 className="text-2xl font-semibold text-foreground">Ready to build?</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                {APP_CONFIG.storeName} POS is completely free and open-source. Clone it, customize it, and
                ship it.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <a href={LIVE_URL} target="_blank" rel="noreferrer">
                    Live Preview
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={REPO_URL} target="_blank" rel="noreferrer">
                    Star on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </Section>
        </div>

        <footer className="mt-16 flex items-center justify-between border-t border-border pt-6 text-sm text-muted-foreground">
          <span>{APP_CONFIG.storeName} POS · React + Vite template</span>
          <a href="#top" className="hover:text-foreground">
            Back to top
          </a>
        </footer>
      </div>
    </div>
  )
}
