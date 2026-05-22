import {test,expect} from '@playwright/test'


test.beforeEach(async({page})=>{
    await page.goto('http://www.uitestingplayground.com/ajax/')
    await page .getByText('Button Triggering AJAX Request').click()
})

test('Auto Waiting',async({page})=>{
    const successButton = page.locator('.bg-success')
    //await successButton.click()

    const text = await successButton.allTextContents()
    //expect(text).toEqual('Data loaded with AJAX get request.')
    await successButton.waitFor({state:'attached'})
    expect(text).toContain('Data loaded with AJAX get request.')
})
