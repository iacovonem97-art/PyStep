import { describe, it, expect } from 'vitest'
import { parseHTML, runTest, validateExercise } from './validator'
import type { ExerciseTest } from '@/types/lesson'

// ============================================
// TESTS VALIDATOR - P0 CRITICAL
// ============================================
// Ce module est le Single Point of Failure de l'app.
// Chaque assertion doit être testée exhaustivement.

describe('parseHTML', () => {
  it('should parse valid HTML document', () => {
    const doc = parseHTML('<html><body><h1>Test</h1></body></html>')
    expect(doc.querySelector('h1')?.textContent).toBe('Test')
  })

  it('should handle minimal HTML', () => {
    const doc = parseHTML('<p>Hello</p>')
    expect(doc.querySelector('p')?.textContent).toBe('Hello')
  })

  it('should handle malformed HTML gracefully', () => {
    // DOMParser est permissif - il ne throw pas
    const doc = parseHTML('<p>Unclosed paragraph')
    expect(doc.querySelector('p')).not.toBeNull()
  })

  it('should handle empty string', () => {
    const doc = parseHTML('')
    expect(doc.body).not.toBeNull()
  })
})

describe('runTest - exists assertion', () => {
  const existsTest: ExerciseTest = {
    name: 'Element exists',
    query: 'h1',
    assert: 'exists',
  }

  it('should pass when element exists', () => {
    const doc = parseHTML('<h1>Title</h1>')
    const result = runTest(doc, existsTest)
    expect(result.passed).toBe(true)
    expect(result.message).toBeUndefined()
  })

  it('should fail when element does not exist', () => {
    const doc = parseHTML('<p>No heading here</p>')
    const result = runTest(doc, existsTest)
    expect(result.passed).toBe(false)
    expect(result.message).toContain('h1')
    expect(result.message).toContain('non trouvé')
  })

  it('should work with complex CSS selectors', () => {
    const doc = parseHTML('<div class="container"><p id="main">Text</p></div>')
    const result = runTest(doc, {
      name: 'Complex selector',
      query: 'div.container > p#main',
      assert: 'exists',
    })
    expect(result.passed).toBe(true)
  })

  it('should handle attribute selectors', () => {
    const doc = parseHTML('<a href="https://example.com">Link</a>')
    const result = runTest(doc, {
      name: 'Attribute selector',
      query: 'a[href]',
      assert: 'exists',
    })
    expect(result.passed).toBe(true)
  })
})

describe('runTest - hasText assertion', () => {
  const hasTextTest: ExerciseTest = {
    name: 'Element has text',
    query: 'p',
    assert: 'hasText',
  }

  it('should pass when element has text content', () => {
    const doc = parseHTML('<p>Some text content</p>')
    const result = runTest(doc, hasTextTest)
    expect(result.passed).toBe(true)
  })

  it('should fail when element is empty', () => {
    const doc = parseHTML('<p></p>')
    const result = runTest(doc, hasTextTest)
    expect(result.passed).toBe(false)
    expect(result.message).toContain('est vide')
  })

  it('should fail when element has only whitespace', () => {
    const doc = parseHTML('<p>   </p>')
    const result = runTest(doc, hasTextTest)
    expect(result.passed).toBe(false)
  })

  it('should pass when element has nested text', () => {
    const doc = parseHTML('<p><span>Nested</span> text</p>')
    const result = runTest(doc, hasTextTest)
    expect(result.passed).toBe(true)
  })

  it('should pass if any matching element has text', () => {
    const doc = parseHTML('<p></p><p>Second has text</p>')
    const result = runTest(doc, hasTextTest)
    expect(result.passed).toBe(true)
  })
})

describe('runTest - count assertion', () => {
  it('should pass when count matches exactly', () => {
    const doc = parseHTML('<li>1</li><li>2</li><li>3</li>')
    const result = runTest(doc, {
      name: '3 list items',
      query: 'li',
      assert: 'count',
      value: 3,
    })
    expect(result.passed).toBe(true)
  })

  it('should fail when count is less', () => {
    const doc = parseHTML('<li>1</li><li>2</li>')
    const result = runTest(doc, {
      name: '3 list items',
      query: 'li',
      assert: 'count',
      value: 3,
    })
    expect(result.passed).toBe(false)
    expect(result.message).toContain('Attendu: 3')
    expect(result.message).toContain('trouvé: 2')
  })

  it('should fail when count is more', () => {
    const doc = parseHTML('<li>1</li><li>2</li><li>3</li><li>4</li>')
    const result = runTest(doc, {
      name: '3 list items',
      query: 'li',
      assert: 'count',
      value: 3,
    })
    expect(result.passed).toBe(false)
    expect(result.message).toContain('trouvé: 4')
  })

  it('should work with count of 0', () => {
    const doc = parseHTML('<p>No divs here</p>')
    const result = runTest(doc, {
      name: 'No divs',
      query: 'div',
      assert: 'count',
      value: 0,
    })
    expect(result.passed).toBe(true)
  })

  it('should work with count of 1', () => {
    const doc = parseHTML('<h1>Single heading</h1>')
    const result = runTest(doc, {
      name: 'One h1',
      query: 'h1',
      assert: 'count',
      value: 1,
    })
    expect(result.passed).toBe(true)
  })
})

describe('runTest - textContains assertion', () => {
  it('should pass when text is found', () => {
    const doc = parseHTML('<p>Hello world!</p>')
    const result = runTest(doc, {
      name: 'Contains hello',
      query: 'p',
      assert: 'textContains',
      value: 'Hello',
    })
    expect(result.passed).toBe(true)
  })

  it('should be case sensitive', () => {
    const doc = parseHTML('<p>Hello world!</p>')
    const result = runTest(doc, {
      name: 'Contains HELLO',
      query: 'p',
      assert: 'textContains',
      value: 'HELLO',
    })
    expect(result.passed).toBe(false)
  })

  it('should fail when text is not found', () => {
    const doc = parseHTML('<p>Hello world!</p>')
    const result = runTest(doc, {
      name: 'Contains goodbye',
      query: 'p',
      assert: 'textContains',
      value: 'goodbye',
    })
    expect(result.passed).toBe(false)
    expect(result.message).toContain('goodbye')
    expect(result.message).toContain("n'a pas été trouvé")
  })

  it('should find text in nested elements', () => {
    const doc = parseHTML('<div><span>Deep</span> <strong>text</strong></div>')
    const result = runTest(doc, {
      name: 'Contains deep',
      query: 'div',
      assert: 'textContains',
      value: 'Deep text',
    })
    expect(result.passed).toBe(true)
  })

  it('should work with special characters', () => {
    const doc = parseHTML('<p>Price: €50</p>')
    const result = runTest(doc, {
      name: 'Contains euro',
      query: 'p',
      assert: 'textContains',
      value: '€50',
    })
    expect(result.passed).toBe(true)
  })
})

describe('runTest - hasAttribute assertion', () => {
  it('should pass when attribute exists (no value check)', () => {
    const doc = parseHTML('<input type="text" required />')
    const result = runTest(doc, {
      name: 'Has required',
      query: 'input',
      assert: 'hasAttribute',
      value: 'required',
    })
    expect(result.passed).toBe(true)
  })

  it('should pass when attribute has matching value', () => {
    const doc = parseHTML('<input type="email" />')
    const result = runTest(doc, {
      name: 'Type is email',
      query: 'input',
      assert: 'hasAttribute',
      value: 'type=email',
    })
    expect(result.passed).toBe(true)
  })

  it('should fail when attribute value does not match', () => {
    const doc = parseHTML('<input type="text" />')
    const result = runTest(doc, {
      name: 'Type is email',
      query: 'input',
      assert: 'hasAttribute',
      value: 'type=email',
    })
    expect(result.passed).toBe(false)
    expect(result.message).toContain('type=email')
  })

  it('should fail when attribute does not exist', () => {
    const doc = parseHTML('<input type="text" />')
    const result = runTest(doc, {
      name: 'Has disabled',
      query: 'input',
      assert: 'hasAttribute',
      value: 'disabled',
    })
    expect(result.passed).toBe(false)
    expect(result.message).toContain('disabled')
  })

  it('should work with href attribute', () => {
    const doc = parseHTML('<a href="https://example.com">Link</a>')
    const result = runTest(doc, {
      name: 'Correct href',
      query: 'a',
      assert: 'hasAttribute',
      value: 'href=https://example.com',
    })
    expect(result.passed).toBe(true)
  })

  it('should work with class attribute', () => {
    const doc = parseHTML('<div class="container main"></div>')
    const result = runTest(doc, {
      name: 'Has class',
      query: 'div',
      assert: 'hasAttribute',
      value: 'class=container main',
    })
    expect(result.passed).toBe(true)
  })
})

describe('runTest - unknown assertion', () => {
  it('should fail gracefully for unknown assertion type', () => {
    const doc = parseHTML('<p>Test</p>')
    const result = runTest(doc, {
      name: 'Unknown test',
      query: 'p',
      // @ts-expect-error Testing invalid assertion type
      assert: 'unknownType',
    })
    expect(result.passed).toBe(false)
    expect(result.message).toContain('inconnu')
  })
})

describe('validateExercise - integration', () => {
  it('should pass when all tests pass', () => {
    const code = `
      <!DOCTYPE html>
      <html>
        <body>
          <h1>Mon titre</h1>
          <p>Un paragraphe de description.</p>
        </body>
      </html>
    `
    const tests: ExerciseTest[] = [
      { name: 'H1 exists', query: 'h1', assert: 'exists' },
      { name: 'H1 has text', query: 'h1', assert: 'hasText' },
      { name: 'P exists', query: 'p', assert: 'exists' },
      { name: 'P has text', query: 'p', assert: 'hasText' },
    ]

    const result = validateExercise(code, tests)
    expect(result.passed).toBe(true)
    expect(result.results).toHaveLength(4)
    expect(result.results.every((r) => r.passed)).toBe(true)
  })

  it('should fail when any test fails', () => {
    const code = '<h1>Title only</h1>'
    const tests: ExerciseTest[] = [
      { name: 'H1 exists', query: 'h1', assert: 'exists' },
      { name: 'P exists', query: 'p', assert: 'exists' }, // This will fail
    ]

    const result = validateExercise(code, tests)
    expect(result.passed).toBe(false)
    expect(result.results[0].passed).toBe(true)
    expect(result.results[1].passed).toBe(false)
  })

  it('should handle empty test array', () => {
    const result = validateExercise('<p>Test</p>', [])
    expect(result.passed).toBe(true)
    expect(result.results).toHaveLength(0)
  })

  it('should provide detailed results for each test', () => {
    const code = '<h1></h1><p>Text</p>'
    const tests: ExerciseTest[] = [
      { name: 'H1 exists', query: 'h1', assert: 'exists' },
      { name: 'H1 has text', query: 'h1', assert: 'hasText' },
      { name: 'P has text', query: 'p', assert: 'hasText' },
    ]

    const result = validateExercise(code, tests)
    expect(result.passed).toBe(false)
    expect(result.results[0]).toEqual({
      name: 'H1 exists',
      passed: true,
      message: undefined,
    })
    expect(result.results[1].passed).toBe(false)
    expect(result.results[1].message).toBeDefined()
    expect(result.results[2].passed).toBe(true)
  })
})

// ============================================
// TESTS DE RÉGRESSION - LEÇONS RÉELLES
// ============================================
// Ces tests simulent les vrais exercices du curriculum

describe('Lesson regression tests', () => {
  describe('Lesson 1.3 - Titres et paragraphes', () => {
    const lesson13Tests: ExerciseTest[] = [
      { name: 'Un titre <h1> est présent', query: 'h1', assert: 'exists' },
      { name: 'Le titre <h1> contient du texte', query: 'h1', assert: 'hasText' },
      { name: 'Un paragraphe <p> est présent', query: 'p', assert: 'exists' },
      { name: 'Le paragraphe contient du texte', query: 'p', assert: 'hasText' },
    ]

    it('should pass valid solution', () => {
      const validCode = `
        <!DOCTYPE html>
        <html>
        <head><title>Ma page</title></head>
        <body>
          <h1>Marie</h1>
          <p>Je suis une développeuse en herbe.</p>
        </body>
        </html>
      `
      const result = validateExercise(validCode, lesson13Tests)
      expect(result.passed).toBe(true)
    })

    it('should fail when h1 is missing', () => {
      const invalidCode = `
        <body>
          <p>Just a paragraph</p>
        </body>
      `
      const result = validateExercise(invalidCode, lesson13Tests)
      expect(result.passed).toBe(false)
      expect(result.results[0].passed).toBe(false)
    })

    it('should fail when h1 is empty', () => {
      const invalidCode = `
        <body>
          <h1></h1>
          <p>Some text</p>
        </body>
      `
      const result = validateExercise(invalidCode, lesson13Tests)
      expect(result.passed).toBe(false)
      expect(result.results[1].passed).toBe(false)
    })
  })

  describe('Lesson 3.1 - Qu\'est-ce que le CSS ?', () => {
    const lesson31Tests: ExerciseTest[] = [
      { name: 'Un <h1> est présent', query: 'h1', assert: 'exists' },
      { name: 'Un <p> est présent', query: 'p', assert: 'exists' },
      { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
    ]

    it('should pass a clean student solution with basic CSS rules', () => {
      const studentCode = `
<style>
  h1 { color: red; }
  p { color: blue; }
</style>
<h1>Bienvenue</h1>
<p>Le CSS, c'est magique !</p>
      `
      const result = validateExercise(studentCode, lesson31Tests)
      expect(result.passed).toBe(true)
      expect(result.results).toHaveLength(3)
    })

    it('should pass a verbose student solution with extra CSS properties', () => {
      const studentCode = `
<style>
  h1 {
    color: red;
    font-size: 32px;
    text-align: center;
    font-family: Arial;
  }
  p {
    color: blue;
    font-size: 18px;
    line-height: 1.5;
  }
  body {
    background-color: lightyellow;
  }
</style>
<h1>Mon super titre</h1>
<p>J'adore le CSS, on peut tout styliser !</p>
      `
      const result = validateExercise(studentCode, lesson31Tests)
      expect(result.passed).toBe(true)
    })

    it('should fail when student forgets the <style> tag', () => {
      const studentCode = `
<h1>Bienvenue</h1>
<p>Le CSS, c'est magique !</p>
      `
      const result = validateExercise(studentCode, lesson31Tests)
      expect(result.passed).toBe(false)
      expect(result.results[2].passed).toBe(false)
    })
  })

  describe('Lesson 3.5 - Mini-projet page À propos', () => {
    const lesson35Tests: ExerciseTest[] = [
      { name: 'Un <header> est présent', query: 'header', assert: 'exists' },
      { name: 'Un <main> est présent', query: 'main', assert: 'exists' },
      { name: 'Un <footer> est présent', query: 'footer', assert: 'exists' },
      { name: 'Au moins 2 paragraphes', query: 'p', assert: 'count', value: 2 },
      { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
      { name: 'Un <div> est présent', query: 'div', assert: 'exists' },
    ]

    it('should pass a minimal correct student solution with exactly 2 <p>', () => {
      const studentCode = `
<style>
  header { background-color: navy; color: white; text-align: center; padding: 15px; }
  main { max-width: 600px; margin: 0 auto; padding: 20px; }
  .card { border: 1px solid #ccc; padding: 10px; background: #f5f5f5; }
  footer { text-align: center; padding: 10px; color: gray; }
</style>
<header>
  <h1>À propos de moi</h1>
</header>
<main>
  <p>Bonjour, je suis un étudiant en développement web.</p>
  <p>J'apprends le HTML et le CSS avec Pystep.</p>
  <div class="card">
    <h2>Mes passions</h2>
    <span>Code, musique et voyages</span>
  </div>
</main>
<footer>
  &copy; 2026
</footer>
      `
      const result = validateExercise(studentCode, lesson35Tests)
      expect(result.passed).toBe(true)
      expect(result.results).toHaveLength(6)
    })

    it('should fail when student adds too many <p> tags (count is exact)', () => {
      const studentCode = `
<style>
  header { background: #333; color: white; padding: 20px; }
  main { padding: 20px; }
  footer { padding: 10px; }
</style>
<header>
  <h1>À propos</h1>
</header>
<main>
  <p>Premier paragraphe.</p>
  <p>Deuxième paragraphe.</p>
  <div>
    <p>Troisième paragraphe dans un div.</p>
  </div>
</main>
<footer>
  <p>Copyright 2026</p>
</footer>
      `
      const result = validateExercise(studentCode, lesson35Tests)
      expect(result.passed).toBe(false)
      // count assert is === 2, but student has 4 <p> tags
      const countResult = result.results[3]
      expect(countResult.passed).toBe(false)
      expect(countResult.message).toContain('Attendu: 2')
      expect(countResult.message).toContain('trouvé: 4')
    })

    it('should fail when student forgets the <div> element', () => {
      const studentCode = `
<style>
  header { background: teal; color: white; padding: 10px; }
  footer { text-align: center; }
</style>
<header><h1>À propos</h1></header>
<main>
  <p>Paragraphe un.</p>
  <p>Paragraphe deux.</p>
</main>
<footer>Mon pied de page</footer>
      `
      const result = validateExercise(studentCode, lesson35Tests)
      expect(result.passed).toBe(false)
      expect(result.results[5].passed).toBe(false) // div missing
    })
  })

  describe('Lesson 2.4 - Mini-projet page de contact', () => {
    const lesson24Tests: ExerciseTest[] = [
      { name: 'Un <header> est présent', query: 'header', assert: 'exists' },
      { name: 'Un <form> est présent', query: 'form', assert: 'exists' },
      { name: 'Un <table> est présent', query: 'table', assert: 'exists' },
      { name: 'Au moins 2 cellules d\'en-tête', query: 'th', assert: 'count', value: 2 },
      { name: 'Au moins 3 lignes dans le tableau', query: 'tr', assert: 'count', value: 3 },
      { name: 'Un <footer> est présent', query: 'footer', assert: 'exists' },
    ]

    it('should pass a realistic student contact page', () => {
      const studentCode = `
<header>
  <h1>Contactez-nous</h1>
  <nav><a href="#">Accueil</a> | <a href="#">Contact</a></nav>
</header>
<main>
  <form>
    <label for="nom">Nom :</label>
    <input type="text" id="nom">
    <label for="email">Email :</label>
    <input type="email" id="email">
    <button type="submit">Envoyer</button>
  </form>
  <h2>Horaires d'ouverture</h2>
  <table>
    <thead>
      <tr><th>Jour</th><th>Horaires</th></tr>
    </thead>
    <tbody>
      <tr><td>Lundi</td><td>9h - 17h</td></tr>
      <tr><td>Mercredi</td><td>10h - 16h</td></tr>
    </tbody>
  </table>
</main>
<footer>
  <p>&copy; 2026 Mon entreprise</p>
</footer>
      `
      const result = validateExercise(studentCode, lesson24Tests)
      expect(result.passed).toBe(true)
      expect(result.results).toHaveLength(6)
      expect(result.results.every((r) => r.passed)).toBe(true)
    })

    it('should fail when student adds extra <tr> rows beyond exact count', () => {
      const studentCode = `
<header><h1>Contact</h1></header>
<form>
  <input type="text">
  <input type="email">
  <button>Envoyer</button>
</form>
<table>
  <tr><th>Jour</th><th>Horaires</th></tr>
  <tr><td>Lundi</td><td>9h-17h</td></tr>
  <tr><td>Mardi</td><td>9h-17h</td></tr>
  <tr><td>Mercredi</td><td>9h-17h</td></tr>
</table>
<footer>&copy; 2026</footer>
      `
      const result = validateExercise(studentCode, lesson24Tests)
      expect(result.passed).toBe(false)
      // tr count is === 3, but student has 4 <tr>
      const trResult = result.results[4]
      expect(trResult.passed).toBe(false)
      expect(trResult.message).toContain('trouvé: 4')
    })

    it('should fail when student forgets the <table> element', () => {
      const studentCode = `
<header><h1>Contact</h1></header>
<form>
  <label>Nom</label>
  <input type="text">
  <label>Email</label>
  <input type="email">
  <button>Envoyer</button>
</form>
<footer>&copy; 2026</footer>
      `
      const result = validateExercise(studentCode, lesson24Tests)
      expect(result.passed).toBe(false)
      expect(result.results[2].passed).toBe(false) // table missing
      expect(result.results[3].passed).toBe(false) // th count 0 !== 2
      expect(result.results[4].passed).toBe(false) // tr count 0 !== 3
    })
  })

  describe('Edge cases from real usage', () => {
    it('should handle HTML with comments', () => {
      const code = `
        <!-- This is a comment -->
        <h1>Title</h1>
        <!-- Another comment -->
      `
      const result = validateExercise(code, [
        { name: 'H1 exists', query: 'h1', assert: 'exists' },
      ])
      expect(result.passed).toBe(true)
    })

    it('should handle HTML with extra whitespace', () => {
      const code = `
        <h1>   Title with spaces   </h1>
        <p>
           Text with newlines
        </p>
      `
      const result = validateExercise(code, [
        { name: 'H1 has text', query: 'h1', assert: 'hasText' },
        { name: 'P has text', query: 'p', assert: 'hasText' },
      ])
      expect(result.passed).toBe(true)
    })

    it('should handle self-closing tags', () => {
      const code = `
        <img src="test.jpg" alt="Test image" />
        <br />
        <input type="text" />
      `
      const result = validateExercise(code, [
        { name: 'Image exists', query: 'img', assert: 'exists' },
        { name: 'Image has alt', query: 'img', assert: 'hasAttribute', value: 'alt' },
        { name: 'Input exists', query: 'input', assert: 'exists' },
      ])
      expect(result.passed).toBe(true)
    })

    it('should handle semantic HTML5 elements', () => {
      const code = `
        <header><nav>Menu</nav></header>
        <main><article>Content</article></main>
        <footer>Copyright</footer>
      `
      const result = validateExercise(code, [
        { name: 'Header exists', query: 'header', assert: 'exists' },
        { name: 'Main exists', query: 'main', assert: 'exists' },
        { name: 'Footer exists', query: 'footer', assert: 'exists' },
        { name: 'Article exists', query: 'article', assert: 'exists' },
        { name: 'Nav exists', query: 'nav', assert: 'exists' },
      ])
      expect(result.passed).toBe(true)
    })
  })
})
