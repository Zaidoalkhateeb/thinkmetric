import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import './CategoryCtaTab.css';

function CategoryCtaTab({ categoryLabel }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button type="button" className="category-cta-tab" onClick={() => setOpen(true)}>
        Choosing the right solution
      </button>

      {open && (
        <div className="category-cta-modal" role="presentation" onClick={() => setOpen(false)}>
          <div
            className="category-cta-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Choosing the right solution"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="category-cta-modal__close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <h2>Choosing the right solution</h2>
            <Link
              to={`/contact?type=technical&product=${encodeURIComponent(categoryLabel)}`}
              className="btn btn--secondary"
              onClick={() => setOpen(false)}
            >
              Request a Technical Discussion
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryCtaTab;
