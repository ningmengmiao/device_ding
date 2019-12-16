// const CURRENT = 'dev'
const CURRENT = 'prod'
const PROFILES = {
  'dev': {
    'online': false,
    'domain': 'http://bptop.vaiwan.com'
  },
  'test': {
    'online': false,
    'domain': 'http://test-api.xxx.com'
  },
  'prod': {
    'online': true,
    'domain': 'http://39.100.242.205:8073'
  }
}
const ENV = PROFILES[CURRENT]

export { ENV }