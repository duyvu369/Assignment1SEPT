const {legitEmail, legitPassword,legitName, emptyField, priceCalculator} = require('../main/legit')

test('Properly check user email', () =>{
    expect(legitEmail("a;kjdlks;;")).toBe(false)
    expect(legitEmail("123243243@abcxyz")).toBe(false)
    expect(legitEmail("valid@email.com")).toBe(true)
    expect(legitEmail("duyvu@yahoo.com")).toBe(true)
})

test('Properly check user password', () =>{
    expect(legitPassword("")).toBe(false)
    expect(legitPassword("tumotdenmuoi")).toBe(true)
    expect(legitPassword("123456789passwordpassword")).toBe(false)
})
test('Properly check user name', () =>{
    expect(legitName("")).toBe(false)
    expect(legitName("Nguyen Thi Minh Anh")).toBe(true)
    expect(legitName("qweyruertiopopopkskfdknfjkdngfkfdbvkdbvhkbdjkfbsjkbfjkdsbnfjksdbndbfjkdbfjkwndjksndlsndlsandslnfowhfnjowfjsnfjlsdnfjksjdnfjskdjbfskf")).toBe(false)
})
test('Properly check empty field', () =>{
    expect(emptyField("")).toBe(true)
    expect(emptyField("12324324")).toBe(false)
    expect(emptyField("a")).toBe(false)
})
test('test Charge calculation works properly', () =>{
    expect(priceCalculator("Physical therapy and rehabilitation services")).toBe(800000)
    expect(priceCalculator("Mental health and drug treatment")).toBe(950000)
})

