import type { ReactNode } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageMain } from '@/components/layout/PageMain'
import { StatCard } from '@/components/stats/StatCard'
import { RevenueTrendChart } from '@/components/reports/RevenueTrendChart'
import { TopProductsChart } from '@/components/reports/TopProductsChart'
import { CategorySalesChart } from '@/components/reports/CategorySalesChart'
import { TopCustomersList } from '@/components/reports/TopCustomersList'
import { OrderStatusBreakdown } from '@/components/reports/OrderStatusBreakdown'
import { PaymentMethodBreakdown } from '@/components/reports/PaymentMethodBreakdown'
import { STRINGS } from '@/config/strings'
import { STAT_SUMMARIES, TOP_SELLER_ORDER_COUNT } from '@/data/stats'
import { CATEGORY_SALES, PAYMENT_METHOD_SHARE, REVENUE_TREND, TOP_PRODUCTS } from '@/data/reports'
import { ORDER_RECORDS } from '@/data/orders'
import { useCustomers } from '@/context/CustomersContext'

function ReportCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export function ReportsPage() {
  const { customers } = useCustomers()

  return (
    <PageMain>
      <PageHeader title={STRINGS.reportsPage.title} subtitle={STRINGS.reportsPage.subtitle} />

      <div className="mb-6 grid grid-cols-1 gap-6 rounded-2xl border border-border bg-card p-5 sm:grid-cols-3">
        {STAT_SUMMARIES.map((stat) => (
          <StatCard
            key={stat.id}
            stat={stat}
            footnote={
              stat.id === 'top-seller'
                ? `${TOP_SELLER_ORDER_COUNT} ${STRINGS.stats.ordersTodaySuffix}`
                : undefined
            }
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ReportCard title={STRINGS.reportsPage.revenueTrend}>
          <RevenueTrendChart points={REVENUE_TREND} />
        </ReportCard>

        <ReportCard title={STRINGS.reportsPage.topProducts}>
          <TopProductsChart products={TOP_PRODUCTS} />
        </ReportCard>

        <ReportCard title={STRINGS.reportsPage.salesByCategory}>
          <CategorySalesChart sales={CATEGORY_SALES} />
        </ReportCard>

        <ReportCard title={STRINGS.reportsPage.topCustomers}>
          <TopCustomersList customers={customers} />
        </ReportCard>

        <ReportCard title={STRINGS.reportsPage.orderStatusBreakdown}>
          <OrderStatusBreakdown orders={ORDER_RECORDS} />
        </ReportCard>

        <ReportCard title={STRINGS.reportsPage.paymentMethodBreakdown}>
          <PaymentMethodBreakdown shares={PAYMENT_METHOD_SHARE} />
        </ReportCard>
      </div>
    </PageMain>
  )
}
