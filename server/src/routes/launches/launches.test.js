const request = require('supertest')
const app = require('../../app')

describe ('Test GET /launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app).get('/launches').expect('Content-Type', /json/).expect(200)
  })
})


describe ('Test POST /launch', () => {
const launchData = {
  mission:'USS Enterprise',
  rocket:'NCC 1701-D',
  target:'kepler-186 f',
  launchDate: 'January 10, 2025'
}

const launchDateWithoutDate = {
  mission:'USS Enterprise',
  rocket:'NCC 1701-D',
  target:'kepler-186 f',
}

const invalidDate = {
  mission:'USS Enterprise',
  rocket:'NCC 1701-D',
  target:'kepler-186 f',
  launchDate: 'zoot'
}
  test('It should respond with 201 created', async () => {
    const response = await request(app).post('/launches').send(launchData).expect('Content-Type', /json/).expect(201)

    const requestDate = new Date(launchData.launchDate).valueOf()
    const responseDate = new Date(response.body.launchDate).valueOf()

    expect (responseDate).toBe(requestDate)
    expect(response.body).toMatchObject(launchDateWithoutDate)
  })


  test('It should catch missing required properties', async () => {
    const response = await request(app).post('/launches').send(launchDateWithoutDate).expect('Content-Type', /json/).expect(400)

    expect(response.body).toStrictEqual({
      error: "Missing required launch property"
    })
  })


  test('It should catch invalid dates', async () => {
    const response = await request(app).post('/launches').send(invalidDate).expect('Content-Type', /json/).expect(400)

    expect(response.body).toStrictEqual({
      error: "Invalid launch date"
    })
  })
})