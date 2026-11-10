import { expect, test, type APIRequestContext } from '@playwright/test'

async function createDrop(request: APIRequestContext, stock: number) {
  const response = await request.post('/api/drops', {
    data: {
      product: `E2E ${Date.now()}-${Math.random()}`,
      price_cents: 15000,
      stock,
      opens_at: new Date(Date.now() - 60_000).toISOString(), // ouvert depuis 1 min
    },
  })
  expect(response.status()).toBe(201)
  return response.json()
}

test('commander décrémente le stock', async ({ page, request }) => {
  const drop = await createDrop(request, 3)
  await page.goto(`/drops/${drop.id}`)
  await expect(page.getByTestId('remaining')).toHaveText('3 / 3 paires restantes')
  await page.getByRole('button', { name: 'Commander' }).click()
  await expect(page.getByRole('status')).toContainText('confirmée')
  await expect(page.getByTestId('remaining')).toHaveText('2 / 3 paires restantes')
})

test('un drop épuisé désactive le bouton', async ({ page, request }) => {
  const drop = await createDrop(request, 1)
  expect((await request.post(`/api/drops/${drop.id}/orders`)).status()).toBe(201)
  await page.goto(`/drops/${drop.id}`)
  await expect(page.getByRole('button', { name: 'Épuisé' })).toBeDisabled()
})
