const sharp = require('sharp')
async function main() {
  await sharp('public/pwa-192x192.png').resize(32, 32).toFile('public/favicon-32.png')
  await sharp('public/pwa-192x192.png').resize(16, 16).toFile('public/favicon-16.png')
  console.log('✅ favicon-32.png, favicon-16.png 생성 완료')
}
main().catch(console.error)
