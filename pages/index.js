import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home({ instructions }) {
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <div style={{ margin: '20px' }}>
      <h2>{t('instructions')}</h2>
      {
        instructions.length > 0 && instructions.map((instruction) => {
          return (
            <div>
              <Link href={`/${instruction.id}`} locale={router.locale}>{instruction.attributes.title}</Link>
              <br />
            </div>

          )
        })
      }
      <div style={{ marginTop: '20px' }}>
        <Link
          href='/'
          locale={router.locale === 'en' ? 'de' : 'en'}>
          {t('change_locale')}
        </Link>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ locale }) => {
  const res = await fetch(`http://localhost:1337/api/instructions?locale=${locale}`)
  const { data } = await res.json()

  return {
    props: {
      instructions: data,
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}