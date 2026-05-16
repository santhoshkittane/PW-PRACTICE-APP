import {test,expect} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
    await page .getByTitle('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator Syntax Rules',async({page})=>{
    //by Tag Name
    await page.locator('input').first().click()

    //by ID
     page.locator('#inputEmail1')
    
    //by class value
    //page.locator('.shape-rectangle')

    //by Attribute
    page.locator('[placeholder="Email"]')

    //by Entire class Value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different locators
    page.locator('input[placeholder="Email"][type="email"]')

    //by partial text
    page.locator(':text("using")')
    //by text
    page.locator(':text("Sign in")')
    //by exact TEXT
page.locator(':text-is("Using the Grid")')
})

test('user Facing Locators',async({page}) =>{
    await page.getByRole('textbox',{name:'Email'}).first().click()
    await page.getByRole('textbox',{name:'Email'}).nth(1).click()
    await page.getByRole('textbox',{name:'Email'}).nth(2).click()
    await page.getByRole('button',{name:'Sign in'}).nth(0).isVisible()
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

test('Locating Child Elements',async({page})=>{

    //await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    //await page.pause()
    //await page.locator('nb-card nb-radio :text-is("Option 2")').click()
    //await page.locator('input.native-input[type="radio"]').click({ force: true })
    //await page.locator('nb-card nb-radio:has-text("Option 2")').click()
    //await page.getByRole('radio', { name: 'Option 2' }).click()
    await page.locator('nb-card').locator('nb-radio :text-is("Option 1")').click()
    //above is not working and need to check the reason
    //await page.locator('.text :text("Option 1")').first().click()

    //await page.getByRole('radio', { name: 'Option 2' }).check()
    //await page.locator('nb-radio:has-text("Option 2")').locator('input.native-input').check()
    //await page.locator('nb-radio:has-text("Option 2") label').click()



   /* const radio = page.getByRole('radio', { name: 'Option 2' })
    await expect(radio).toBeVisible()
    await radio.click()
    */

    
})
