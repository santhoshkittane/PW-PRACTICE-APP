import { input } from '@angular/core'
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
//await page.locator('nb-radio-group nb-radio :text-is("Option 1"):text-is("Option 1")').click()
//await page.locator('nb-card').getByRole('button',{name:'Sign in'}).first().click()
await page.locator('nb-card').getByRole('button',{name:'Sign in'}).nth(0).click()    
})

test('Locating Parent Elements',async({page})=>{
    await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox',{name:'Email'}).click()
    await page.locator('nb-card', {has: page.locator("#inputPassword2")}).getByRole('textbox',{name:'Password'}).click()
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:'Email'}).click()

    await page.locator('nb-card nb-card-body').filter({has:page.locator('nb-checkbox')}).filter({hasText:'Sign in'})
    .getByRole('textbox',{name:'Email'}).click()
await page.waitForTimeout(3000);
    await page.locator('nb-card nb-card-body').filter({has:page.locator('nb-checkbox')}).filter({hasText:'Sign in'})
    .getByRole('textbox',{name:'Password'}).click()
    // await page.locator('nb-card nb-card-body').filter({hasText:'Option 1'}).getByRole('radio',{name:'Option 1'}).click()
    //await page.locator('Basic form').filter({hasText:"Check me out})"}).locator(".custom-checkbox").click()
    //await page.getByLabel('Option 1').check()
    //await page.locator('nb_card nb_card_body').filter({hasText:'Option 1'}).getByText('Option 1').click()
    //await page.locator('label:has-text("Option 2")').click()
    //await page.locator('label:has-text("Option 2")').click({force:true})
    //await page.locator('label:has-text("Option 2") input[type="radio"]').check({ force: true })
    await page.locator(':text-is("Using the Grid")').locator("..").getByRole('textbox',{name:'Password'}).click()
    
})

test('Reusing Locators',async({page}) => {
    var basicForm= page.locator('nb-card').filter({hasText:"Basic form"});
    var emailField= basicForm.getByRole('textbox',{name:'Email'})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox',{name:'Password'}).fill('test@123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click();

    await expect(emailField).toHaveValue('test@test.com')

})

test('Extracting Values',async({page})=>{
    var basicForm= page.locator('nb-card').filter({hasText:"Basic form"});
    const buttonText = await basicForm.getByRole('button').textContent();
    expect(buttonText).toBe('Submit');
    console.log('The TEXT present: ' + buttonText);

    //to check atleast 1 radio is option 1

    const radioValues = await page.locator('nb-radio').allTextContents();
    console.log('Radio values: ' + radioValues);
    expect(radioValues).toContain('Option 1');
    var emailField= basicForm.getByRole('textbox',{name:'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue();
    console.log('Email field value: ' + emailValue);
    expect(emailValue).toBe('test@test.com')
    // const EmailValue = emailField.getAttribute('placeholder').valueOf();
    // console.log('Email field placeholder: ' + EmailValue);
    // expect(EmailValue).toBe('Email')
        //var passwordField= basicForm.getByRole('textbox',{name:'Password'})
        var passwordField= await page.locator('nb-card', {has: page.locator("#exampleInputPassword1")}).getByRole('textbox',{name:'Password'}).getAttribute('placeholder');
        console.log('PassWord placeholder: ' + passwordField);
        var pwd1 = await basicForm.locator('#exampleInputPassword1').getAttribute('placeholder');
        console.log('PassWord placeholder123: ' + pwd1);
        //var passwordField1= await page.locator('#exampleInputPassword1').inputValue();  
        //const passwordValue = await passwordField.allTextContents();
        //var passwordValue = await passwordField.
        //console.log('PassWord placeholder: ' + passwordValue);
        //expect(passwordValue).toBe('Password');  
        
        var txtbox = await page.locator(':has-text("Remember me")').getByRole('textbox').first().getAttribute('placeholder');
        console.log('First input field placeholder: ' + txtbox);
        var txtbox2 = await page.locator(':has-text("Remember me")').getByRole('textbox').nth(1).getAttribute('placeholder');
        console.log('Second input field placeholder: ' + txtbox2);


}
)

