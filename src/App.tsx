import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { BookmarksPage } from './pages/BookmarksPage'
import { HomePage } from './pages/HomePage'
import { JuzPage } from './pages/JuzPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PagePage } from './pages/PagePage'
import { ReaderPage } from './pages/ReaderPage'
import { SearchPage } from './pages/SearchPage'
import { SettingsPage } from './pages/SettingsPage'

/** Every address in the app (plan, section 5 · URLs). */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="sura/:sura" element={<ReaderPage />} />
        <Route path="sura/:sura/:aya" element={<ReaderPage />} />
        <Route path="juz/:juz" element={<JuzPage />} />
        <Route path="page/:page" element={<PagePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
