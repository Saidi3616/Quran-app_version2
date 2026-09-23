import { AsyncStatus } from '../components/AsyncStatus'
import { useAsync } from '../hooks/useAsync'
import { getSourceNotices } from '../quran'
import './AboutPage.css'

const REPOSITORY = 'https://github.com/Saidi3616/Quran-app_version2'

// "/about" — sources and licences (FR-017 · specs/licenser.md).
export function AboutPage() {
  const notices = useAsync(getSourceNotices, [])

  return (
    <article className="about">
      <h1>About</h1>
      <p>
        A free, non-commercial Quran app. No ads, no tracking and no login —
        your bookmarks and settings stay on your own device.
      </p>

      <h2>Quran text</h2>
      <p>
        The Arabic text (Uthmani script) is the{' '}
        <strong>Tanzil Quran Text</strong> from{' '}
        <a href="https://tanzil.net">tanzil.net</a>, licensed under{' '}
        <a href="https://creativecommons.org/licenses/by/3.0/">
          Creative Commons Attribution 3.0
        </a>
        . It is shown exactly as published, without any changes. Check{' '}
        <a href="https://tanzil.net/updates/">tanzil.net/updates</a> for updates
        to the text.
      </p>

      <h2>Translation</h2>
      <p>
        English translation: <strong>Saheeh International</strong>, from{' '}
        <a href="https://tanzil.net/trans/">tanzil.net/trans</a>. Used for
        non-commercial purposes only, as required by its terms of use.
      </p>

      <h2>Font</h2>
      <p>
        The Arabic text is set in{' '}
        <a href="https://github.com/aliftype/amiri">Amiri Quran</a>, © The Amiri
        Project Authors, licensed under the{' '}
        <a href={`${import.meta.env.BASE_URL}licenses/amiri-quran-OFL.txt`}>
          SIL Open Font License 1.1
        </a>
        .
      </p>

      <h2>Source code</h2>
      <p>
        <a href={REPOSITORY}>{REPOSITORY.replace('https://', '')}</a>
      </p>

      <h2>Copyright notices</h2>
      {notices.status === 'done' ? (
        <>
          <h3>Tanzil Quran Text</h3>
          <pre className="about__notice">{notices.data.quran}</pre>
          <h3>Tanzil Quran Metadata</h3>
          <pre className="about__notice">{notices.data.metadata}</pre>
          <h3>Translation</h3>
          <pre className="about__notice">{notices.data.translation}</pre>
        </>
      ) : (
        <AsyncStatus state={notices} />
      )}
    </article>
  )
}
