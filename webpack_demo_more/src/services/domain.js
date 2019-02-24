
const env = process.env.DOMAIN_ENV === 'production' ? 'prod' : 'dev'

export const domainConfig = {
  dev: {
    domain: 'http://localhost:9093'
  },
  prod: {
    domain: 'http://localhost:9093'
  }
}

function getDomin (domin) {
  return domainConfig[env][domin]
}

const DOMAIN = {
  domain: getDomin('domain')
}

export default DOMAIN