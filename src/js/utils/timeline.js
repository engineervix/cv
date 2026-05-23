/**
 * Processes H3 headings that represent timeline entries in the CV.
 * A timeline entry is an H3 heading with the format: "Title [Period] | Organization"
 * Example: "Software Engineer [2020-2022] | Company X"
 *
 * The function transforms these headings into a structured format by:
 * 1. Extracting the title, period, and organization
 * 2. Creating a div with class 'timeline-meta' containing period and organization
 * 3. Preserving any HTML formatting within the title and organization (e.g., links)
 *
 * @param {Document} doc - The DOM Document object containing the timeline entries
 *
 * @example
 * // Input HTML:
 * // <h3>Software Engineer [2020-2022] | <a href="https://company.com">Company X</a></h3>
 *
 * // Output HTML:
 * // <h3 class="timeline-entry">Software Engineer</h3>
 * // <div class="timeline-meta">
 * //   <div class="organization"><a href="https://company.com">Company X</a></div>
 * //   <div class="period">2020-2022</div>
 * // </div>
 */
export function processTimelineEntries(doc) {
  doc.querySelectorAll('h3').forEach((heading) => {
    const entryMatch = heading.innerHTML.match(/^(.*?) \[([^\]]+)\] \| (.+)$/)
    if (!entryMatch) return

    const [, title, period, organization] = entryMatch

    heading.innerHTML = title
    heading.className = 'timeline-entry'

    // Create and insert the meta div after the h3
    const metaDiv = document.createElement('div')
    metaDiv.className = 'timeline-meta'
    metaDiv.innerHTML = `
      <div class="organization">${organization}</div>
      <div class="period">${period}</div>
    `
    heading.insertAdjacentElement('afterend', metaDiv)
  })
}
