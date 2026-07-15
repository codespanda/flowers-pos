import { CreditCard, Banknote, Gift, ShoppingBag, PackageX, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageMain } from '@/components/layout/PageMain'
import { Button } from '@/components/ui/button'
import { SettingsSection } from '@/components/settings/SettingsSection'
import { SettingsField } from '@/components/settings/SettingsField'
import { ToggleRow } from '@/components/settings/ToggleRow'
import { TeamList } from '@/components/settings/TeamList'
import { STRINGS } from '@/config/strings'
import { APP_CONFIG } from '@/config/app'
import { STAFF_MEMBERS } from '@/data/staff'

export function SettingsPage() {
  function handleSaveChanges() {
    toast.success(STRINGS.toasts.settingsSaved)
  }

  return (
    <PageMain>
      <PageHeader
        title={STRINGS.settingsPage.title}
        subtitle={STRINGS.settingsPage.subtitle}
        actions={
          <Button size="lg" onClick={handleSaveChanges}>
            {STRINGS.settingsPage.saveChanges}
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SettingsSection
          title={STRINGS.settingsPage.storeProfile}
          hint={STRINGS.settingsPage.storeProfileHint}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SettingsField
              id="store-name"
              label={STRINGS.settingsPage.storeName}
              defaultValue={APP_CONFIG.storeName}
            />
            <SettingsField
              id="store-tagline"
              label={STRINGS.settingsPage.storeTagline}
              defaultValue={APP_CONFIG.storeTagline}
            />
            <SettingsField
              id="counter-label"
              label={STRINGS.settingsPage.counterLabel}
              defaultValue={APP_CONFIG.counterLabel}
            />
          </div>
        </SettingsSection>

        <SettingsSection title={STRINGS.settingsPage.pricing} hint={STRINGS.settingsPage.pricingHint}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SettingsField
              id="tax-rate"
              label={STRINGS.settingsPage.taxRate}
              defaultValue={`${(APP_CONFIG.taxRate * 100).toFixed(1)}%`}
            />
          </div>
        </SettingsSection>

        <SettingsSection
          title={STRINGS.settingsPage.paymentMethods}
          hint={STRINGS.settingsPage.paymentMethodsHint}
        >
          <div className="divide-y divide-border">
            <ToggleRow
              id="payment-card"
              label={STRINGS.payment.card}
              icon={<CreditCard className="size-4" />}
              defaultChecked
            />
            <ToggleRow
              id="payment-cash"
              label={STRINGS.payment.cash}
              icon={<Banknote className="size-4" />}
              defaultChecked
            />
            <ToggleRow
              id="payment-gift-card"
              label={STRINGS.payment.giftCard}
              icon={<Gift className="size-4" />}
              defaultChecked
            />
          </div>
        </SettingsSection>

        <SettingsSection
          title={STRINGS.settingsPage.notifications}
          hint={STRINGS.settingsPage.notificationsHint}
        >
          <div className="divide-y divide-border">
            <ToggleRow
              id="notify-new-orders"
              label={STRINGS.settingsPage.notifyNewOrders}
              icon={<ShoppingBag className="size-4" />}
              defaultChecked
            />
            <ToggleRow
              id="notify-low-stock"
              label={STRINGS.settingsPage.notifyLowStock}
              icon={<PackageX className="size-4" />}
              defaultChecked
            />
            <ToggleRow
              id="notify-daily-summary"
              label={STRINGS.settingsPage.notifyDailySummary}
              icon={<Mail className="size-4" />}
              defaultChecked={false}
            />
          </div>
        </SettingsSection>

        <SettingsSection
          title={STRINGS.settingsPage.team}
          hint={STRINGS.settingsPage.teamHint}
        >
          <TeamList members={STAFF_MEMBERS} />
        </SettingsSection>
      </div>
    </PageMain>
  )
}
