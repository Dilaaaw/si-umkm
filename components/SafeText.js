// components/SafeText.js
import DOMPurify from 'dompurify';

export default function SafeText({ html }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}
