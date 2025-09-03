import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar usuário de exemplo
  const user = await prisma.user.upsert({
    where: { email: 'admin@exemplo.com' },
    update: {},
    create: {
      email: 'admin@exemplo.com',
      name: 'Administrador',
      role: 'admin',
    },
  })

  // Criar registros de exemplo
  const record1 = await prisma.record.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      title: 'Primeiro Registro',
      description: 'Este é o primeiro registro de exemplo no sistema.',
      userId: user.id,
    },
  })

  const record2 = await prisma.record.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      title: 'Segundo Registro',
      description: 'Este é o segundo registro de exemplo para demonstração.',
      userId: user.id,
    },
  })

  console.log('✅ Seed concluído!')
  console.log({ user, record1, record2 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })