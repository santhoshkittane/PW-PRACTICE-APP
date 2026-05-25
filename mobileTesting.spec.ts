import { test, expect, devices } from '@playwright/test'



// test.beforeEach(async({page})=>{
//     await page.goto('http://localhost:4200/')
//     await page .getByTitle('Forms').click()
//     await page.getByText('Form Layouts').click()
// })
    test.use({...devices['MI 11 Ultra']})
test('Mobile Device Emulation', async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.waitForTimeout(20000)
    await page.getByTitle('Forms').click()
    await page.getByText('Form Layouts').click()
    await page.getByRole('textbox', { name: 'Email' }).first().click()
    await page.getByRole('textbox', { name: 'Email' }).nth(1).click()
    await page.getByRole('textbox', { name: 'Email' }).nth(2).click()
    await page.getByRole('button', { name: 'Sign in' }).nth(0).isVisible()
    //await page.getByRole('checkbox',{name:'Remember me'}).nth(0).click()
    //await expect(page.getByTitle('IoT Dashboard')).toBeVisible()
    const isVisible = await page.getByTitle('IoT Dashboard').isVisible()
    if (isVisible) {
        console.log('IoT Dashboard is visible')
        await page.getByTitle('IoT Dashboard').click()
    } else {
        console.log('IoT Dashboard is not visible')
    }

})