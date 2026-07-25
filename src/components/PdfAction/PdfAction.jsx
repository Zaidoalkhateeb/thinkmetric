import { Link } from 'react-router-dom';
import { FileText, Download } from 'lucide-react';
import { DocumentIcon } from '../IconMark/IconMark';
import './PdfAction.css';

/**
 * Predictable PDF/datasheet behavior for product pages.
 * Real PDF present -> functional "Open Product Datasheet" link (new tab).
 * No PDF -> honest disabled state + "Request documentation" CTA, never a
 * broken or empty link.
 */
function PdfAction({ pdfUrl, modelName }) {
  if (pdfUrl) {
    return (
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--primary pdf-action__link"
      >
        <FileText size={17} aria-hidden="true" />
        Open Product Datasheet
        <Download size={15} aria-hidden="true" />
      </a>
    );
  }

  return (
    <div className="pdf-action pdf-action--pending">
      <div className="pdf-action__pending-row">
        <DocumentIcon aria-hidden="true" />
        <span>Datasheet coming soon</span>
      </div>
      <Link
        to={`/contact?type=general&product=${encodeURIComponent(modelName)}`}
        className="btn btn--secondary btn--sm"
      >
        Request documentation
      </Link>
    </div>
  );
}

export default PdfAction;
