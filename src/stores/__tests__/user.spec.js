import axios from 'axios'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../user.js'

const localhost_url = 'http://localhost:9000/api'

const resLoginSuccess = {
  data: {
    success: true,
    message: 'Success'
  }
}

const resLoginFail = {
  data: {
    success: false,
    message: 'There is no account associated to this email'
  }
}

const resGetUserSuccess = {
  data: {
    success: true,
    user: {
      email: 'foo@bar.com'
    }
  }
}

const resSignupSuccess = resGetUserSuccess

jest.mock('axios')

describe('API calls & stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('getters twitter_url', async () => {
    const store = useUserStore()
    expect(store.twitter_url).toBe(`${localhost_url}/auth/twitter`)
  })

  test('getUser with success', async () => {
    axios.get.mockResolvedValueOnce(resGetUserSuccess);
    const store = useUserStore()
    expect(store.gotten_user).toBe(null)
    const result = await store.getUser()
    expect(store.gotten_user).toEqual(resGetUserSuccess.data.user)
    expect(result).toEqual(resGetUserSuccess.data.user)
  })

  test('getUser with failure', async () => {
    axios.get.mockImplementation(() => {
      throw new Error('Something went wrong');
    });

    const store = useUserStore()
    expect(store.gotten_user).toBe(null)
    const result = await store.getUser()
    expect(store.gotten_user).toEqual(null)
    expect(result).toEqual('Something went wrong')
  })

  test('login user with credentials', async () => {
    axios.post.mockResolvedValueOnce(resLoginSuccess);

    const store = useUserStore()
    const result = await store.login({
      email: 'foo@bar.com',
      password: '123456a!'
    })
    
    expect(result.success).toBe(true)
    expect(result.message).toBe('Success')
  })

  test('login user with invalid credentials', async () => {
    axios.post.mockResolvedValueOnce(resLoginFail);

    const store = useUserStore()
    const result = await store.login({
      email: 'bad@email.com',
      password: '123456a!'
    })
    
    expect(result.success).toBe(false)
    expect(result.message).toBe('There is no account associated to this email')
  })

  test('login throws error', async () => {
    axios.post.mockImplementation(() => {
      throw new Error('Something went wrong');
    });

    const store = useUserStore()
    const result = await store.login({
      email: 'bad@email.com',
      password: '123456a!'
    })
    
    expect(result.success).toBe(false)
    expect(result.message).toEqual(new Error('Something went wrong'))
  })

  test('sign up with valid credentials', async () => {
    axios.post.mockResolvedValueOnce(resSignupSuccess);

    const store = useUserStore()
    const result = await store.signup({
      email: 'bad@email.com',
      password: '123456a!'
    })
    
    expect(result.success).toBe(true)
  })

  test('sign up with invalid credentials', async () => {
    axios.post.mockImplementation(() => {
      throw new Error('Something went wrong');
    });

    const store = useUserStore()
    const result = await store.signup({
      email: 'bad@email.com',
      password: '123456a!'
    })
    
    expect(result.success).toBe(false)
    expect(result.message).toEqual(new Error('Something went wrong'))
  })
})
