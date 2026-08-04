import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import './CategoryCtaTab.css';

function CategoryCtaTab({ categoryLabel }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;

    // Move focus into the dialog on open, keep Tab cycling inside it while
    // open, and return focus to the trigger button once it closes.
    const trigger = triggerRef.current;
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className="category-cta-tab"
        aria-label="Choosing the right solution"
        onClick={() => setOpen(true)}
      >
        <span className="category-cta-tab__desktop-label">Choosing the right solution</span>
        <span className="category-cta-tab__mobile-label" aria-hidden="true">Need help?</span>
      </button>

      {open && (
        <div className="category-cta-modal" role="presentation" onClick={close}>
          <div
            className="category-cta-modal__panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Choosing the right solution"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              ref={closeRef}
              className="category-cta-modal__close"
              onClick={close}
              aria-label="Close"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <h2>Choosing the right solution</h2>
            <Link
              to={`/contact?type=technical&product=${encodeURIComponent(categoryLabel)}`}
              className="btn btn--secondary"
              onClick={close}
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
