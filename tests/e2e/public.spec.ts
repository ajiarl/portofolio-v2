import { test, expect } from '@playwright/test'

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Aji Arlando/i)
})

test('work page loads successfully', async ({ page }) => {
  await page.goto('/work')

  await expect(page).toHaveURL(/\/work$/)
  await expect(
    page.getByRole('heading', { name: 'Selected Work' })
  ).toBeVisible()
})

test('about page loads successfully', async ({ page }) => {
  await page.goto('/about')

  await expect(page).toHaveURL(/\/about$/)
})

test('contact page loads successfully', async ({ page }) => {
  await page.goto('/contact')

  await expect(page).toHaveURL(/\/contact$/)
  await expect(
    page.getByRole('heading', { name: 'Contact' })
  ).toBeVisible()
})

test('work page shows published projects', async ({ page }) => {
  await page.goto('/work')

  const projectLinks = page.locator('a[href^="/work/"]')

  await expect(projectLinks.first()).toBeVisible()
  expect(await projectLinks.count()).toBeGreaterThan(0)
})

test('published project opens its detail page', async ({ page }) => {
  await page.goto('/work')

  const projectLink = page.locator('a[href^="/work/"]').first()
  const href = await projectLink.getAttribute('href')

  expect(href).toMatch(/^\/work\/.+/)

  await projectLink.click()

  await expect(page).toHaveURL(/\/work\/.+/)
  await expect(page.locator('h1')).toBeVisible()
})

test('invalid project slug returns 404', async ({ request }) => {
  const response = await request.get(
    '/work/this-project-definitely-does-not-exist'
  )

  const body = await response.text()

  expect(body).toContain('SYSTEM FAULT: PAGE NOT FOUND')
})

test('robots.txt is available', async ({ request }) => {
  const response = await request.get('/robots.txt')

  expect(response.ok()).toBeTruthy()

  const body = await response.text()

  expect(body).toContain('User-Agent: *')
  expect(body).toContain('Sitemap:')
  expect(body).toContain('/sitemap.xml')
})

test('sitemap.xml is available and contains published project URLs', async ({
  request,
}) => {
  const response = await request.get('/sitemap.xml')

  expect(response.ok()).toBeTruthy()

  const body = await response.text()

  expect(body).toContain('<urlset')
  expect(body).toContain('/work')
  expect(body).toContain('/about')
  expect(body).toContain('/contact')
})

test('unauthenticated user is redirected from dashboard', async ({ page }) => {
  const response = await page.goto('/dashboard')

  expect(response?.status()).toBe(200)
  expect(page.url()).toContain('/login')
})

test('unauthenticated user is redirected from dashboard projects', async ({
  page,
}) => {
  const response = await page.goto('/dashboard/projects')

  expect(response?.status()).toBe(200)
  expect(page.url()).toContain('/login')
})
