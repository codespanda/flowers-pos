import { Link } from 'react-router-dom'
import {
  Flower2,
  Sun,
  Moon,
  ArrowRight,
  Code2,
  Zap,
  Palette,
  ShoppingCart,
  BarChart3,
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

const TOC_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'scripts', label: 'Scripts' },
  { id: 'deploy', label: 'Deploy to GitHub Pages' },
  { id: 'structure', label: 'Project structure' },
  { id: 'pages', label: 'Pages & routes' },
  { id: 'components', label: 'Using components' },
  { id: 'theming', label: 'Theming & dark mode' },
]

const PAGES_TABLE: Array<{ route: string; description: string }> = [
  { route: ROUTES.pos, description: 'Counter view — product grid, cart, coupons, and checkout' },
  { route: ROUTES.orders, description: 'Order history with status and payment filters' },
  { route: ROUTES.customers, description: 'Customer directory with contact details and history' },
  { route: ROUTES.coupons, description: 'Coupon and discount management' },
  { route: ROUTES.reports, description: 'Revenue trends, top products, and payment breakdowns' },
  { route: ROUTES.settings, description: 'Store profile, pricing, payment methods, and team' },
  { route: ROUTES.notifications, description: 'Order, inventory, and system notifications' },
  { route: ROUTES.login, description: 'Sign in screen' },
  { route: ROUTES.signup, description: 'Create an account' },
  { route: ROUTES.forgotPassword, description: 'Password reset request' },
]

const SCRIPTS_TABLE: Array<{ command: string; description: string }> = [
  { command: 'npm run dev', description: 'Start the Vite dev server with HMR.' },
  { command: 'npm run build', description: 'Type-check and build to dist/.' },
  { command: 'npm run preview', description: 'Serve the production build locally.' },
  { command: 'npm run lint', description: 'Run Oxlint across the project.' },
]

const STRUCTURE_TREE = `src/
├─ App.tsx              # route table
├─ main.tsx             # app entry (BrowserRouter)
├─ pages/                # route-level page components
├─ components/
│  ├─ ui/                # shadcn primitives (Button, Card…)
│  ├─ layout/            # AppShell, Sidebar, TopBar, PageHeader
│  ├─ auth/               # AuthLayout, ProtectedLayout
│  ├─ order/              # OrderPanel, OrderLineItem, CouponInput…
│  ├─ products/           # ProductGrid, ProductCard, filters
│  ├─ orders/             # OrdersTable, OrderStatusBadge
│  ├─ customers/          # CustomerCard, forms
│  ├─ coupons/            # CouponsTable, forms
│  ├─ reports/            # chart components
│  ├─ settings/           # SettingsSection, ToggleRow, TeamList
│  ├─ stats/              # StatCard, StatsBar
│  └─ notifications/      # NotificationItem, popover
├─ context/               # AuthContext, CustomersContext, CouponsContext…
├─ data/                  # mock data (products, orders, customers…)
├─ config/                # routes, app config, nav, strings
├─ hooks/                 # useOrder
├─ lib/                   # cn, format, validation helpers
└─ types/                 # shared TypeScript types`

export function DocsPage() {
  const { isDark, toggle } = useDarkToggle()

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-brand-muted text-brand">
              <Flower2 className="size-4" />
            </span>
            <span className="text-sm font-semibold">{APP_CONFIG.storeName} POS</span>
            <Badge variant="outline" className="ml-1 hidden sm:inline-flex">
              v1.0 · React + Vite
            </Badge>
          </a>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={toggle}>
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/showcase">Showcase</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                <Code2 className="size-4" />
                GitHub
              </a>
            </Button>
            <Button asChild size="sm">
              <Link to={ROUTES.pos}>Open POS</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <nav className="sticky top-20 flex flex-col gap-0.5">
            {TOC_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <section className="pb-16">
            <Badge variant="outline" className="sm:hidden">
              v1.0 · React + Vite POS template
            </Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Ring up sales in minutes, not months.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Everything you need to run {APP_CONFIG.storeName} POS and build with its component
              library — a florist counter POS built on React 19, Vite 8, Tailwind v4, and shadcn/ui.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to={ROUTES.pos}>
                  Open the live POS
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#quick-start">Read the quick start</a>
              </Button>
            </div>
          </section>

          <div className="flex flex-col gap-12">
            <Section id="overview">
              <SectionHeading
                eyebrow="Overview"
                title="A production-ready florist POS starter"
                description="A counter-ready point-of-sale starter with product grid, cart, coupons, orders, customers, and reports — fully responsive with dark mode."
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-brand-muted text-brand">
                      <Zap className="size-4.5" />
                    </span>
                    <CardTitle>React 19 + Vite 8</CardTitle>
                    <CardDescription>Instant HMR in dev and a tiny, fast production build.</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-brand-muted text-brand">
                      <Palette className="size-4.5" />
                    </span>
                    <CardTitle>Tailwind v4 + shadcn/ui</CardTitle>
                    <CardDescription>Accessible, themeable components built on radix-ui primitives.</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-brand-muted text-brand">
                      <ShoppingCart className="size-4.5" />
                    </span>
                    <CardTitle>Cart, coupons & checkout</CardTitle>
                    <CardDescription>Full order flow with line items, coupon codes, and payment methods.</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-brand-muted text-brand">
                      <BarChart3 className="size-4.5" />
                    </span>
                    <CardTitle>Reports & analytics</CardTitle>
                    <CardDescription>Revenue trends, top products, and payment breakdowns, ready for real data.</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </Section>

            <Section id="quick-start">
              <SectionHeading
                eyebrow="Quick start"
                title="Get it running locally"
                description="You'll need Node 18+ (Node 20 or 22 recommended) and npm."
              />
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">1. Get the code</p>
                  <p className="mb-2 text-sm text-muted-foreground">Clone the repository (or download it as a ZIP).</p>
                  <CodeBlock language="bash" code={`git clone ${REPO_URL}.git\ncd flowers-pos`} />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">2. Install dependencies</p>
                  <CodeBlock language="bash" code="npm install" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">3. Start the dev server</p>
                  <p className="mb-2 text-sm text-muted-foreground">Vite serves the app at http://localhost:5173 with hot reload.</p>
                  <CodeBlock language="bash" code="npm run dev" />
                </div>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                The <code className="rounded bg-muted px-1 py-0.5 text-xs">@</code> alias points to{' '}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">src/</code>, so imports look like{' '}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">import {'{'} Button {'}'} from '@/components/ui/button'</code>.
              </p>
            </Section>

            <Section id="scripts">
              <SectionHeading eyebrow="Scripts" title="Available commands" />
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 font-medium text-foreground">Command</th>
                      <th className="px-4 py-2 font-medium text-foreground">What it does</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {SCRIPTS_TABLE.map((row) => (
                      <tr key={row.command}>
                        <td className="px-4 py-2 font-mono text-xs text-brand">{row.command}</td>
                        <td className="px-4 py-2 text-muted-foreground">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="deploy">
              <SectionHeading
                eyebrow="Deploy"
                title="Deploy to GitHub Pages"
                description="This project ships with a GitHub Actions workflow that builds and deploys on every push to main."
              />
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">1. Clean URLs on a static host</p>
                  <p className="mb-2 text-sm text-muted-foreground">
                    GitHub Pages has no server-side rewrites, so a hard navigation to a nested route like{' '}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">/orders</code> would 404 at the server
                    before React Router ever sees it. public/404.html re-encodes the path and redirects to the
                    root; a small script at the top of index.html decodes it back with{' '}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">history.replaceState</code> before the
                    router mounts — see{' '}
                    <a
                      href="https://github.com/rafgraph/spa-github-pages"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand hover:underline"
                    >
                      rafgraph/spa-github-pages
                    </a>
                    .
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">2. Enable Pages</p>
                  <p className="text-sm text-muted-foreground">
                    In your repo: Settings → Pages → Source → GitHub Actions. A public/CNAME file keeps a custom
                    domain attached across deploys.
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">3. Push</p>
                  <p className="mb-2 text-sm text-muted-foreground">
                    The workflow in .github/workflows/deploy.yml handles the rest.
                  </p>
                  <CodeBlock language="bash" code="git push origin main" />
                </div>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Live at{' '}
                <a href={LIVE_URL} target="_blank" rel="noreferrer" className="text-brand hover:underline">
                  {LIVE_URL}
                </a>
              </p>
            </Section>

            <Section id="structure">
              <SectionHeading eyebrow="Project structure" title="A quick map of where things live" />
              <CodeBlock code={STRUCTURE_TREE} />
            </Section>

            <Section id="pages">
              <SectionHeading eyebrow="Pages & routes" title="Every route and what it renders" />
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 font-medium text-foreground">Route</th>
                      <th className="px-4 py-2 font-medium text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {PAGES_TABLE.map((row) => (
                      <tr key={row.route}>
                        <td className="px-4 py-2 font-mono text-xs text-brand">{row.route}</td>
                        <td className="px-4 py-2 text-muted-foreground">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="components">
              <SectionHeading
                eyebrow="Using components"
                title="Compose from the UI kit"
                description="Components live under src/components. Import what you need and compose."
              />
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">Buttons</p>
                  <CodeBlock
                    language="tsx"
                    code={`import { Button } from '@/components/ui/button';\n\n<Button>Default</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="destructive">Delete</Button>\n<Button variant="ghost" size="sm">Ghost</Button>`}
                  />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">StatCard</p>
                  <CodeBlock
                    language="tsx"
                    code={`import { StatCard } from '@/components/stats/StatCard';\nimport { DollarSign } from 'lucide-react';\n\n<StatCard\n  stat={{\n    label: 'Today\\'s revenue',\n    value: '$1,284',\n    icon: DollarSign,\n    change: { direction: 'up', value: '+8.2%', comparisonLabel: 'vs yesterday' },\n  }}\n/>`}
                  />
                </div>
              </div>
            </Section>

            <Section id="theming">
              <SectionHeading
                eyebrow="Theming"
                title="Theming & dark mode"
                description="Theming uses Tailwind's dark class strategy. Colors are CSS custom properties defined in the global stylesheet and toggled by adding .dark to the document root."
              />
              <CodeBlock
                language="css"
                code={`:root {\n  --brand: #c22a63;   /* rose/magenta */\n  --background: #f4f4f6;\n  --foreground: #1c1a20;\n}\n.dark {\n  --brand: #e8558f;\n  --background: #17151a;\n  --foreground: #f1f0f2;\n}`}
              />
              <p className="mt-4 text-sm text-muted-foreground">
                To change the brand color, update the <code className="rounded bg-muted px-1 py-0.5 text-xs">--brand</code>{' '}
                values in src/index.css. Use{' '}
                <a href="https://tints.dev" target="_blank" rel="noreferrer" className="text-brand hover:underline">
                  tints.dev
                </a>{' '}
                to generate a full palette from a hex color.
              </p>
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
    </div>
  )
}
