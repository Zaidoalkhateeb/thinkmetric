import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import './CustomSelect.css';

/**
 * Accessible listbox-style select used in place of native <select> for a
 * consistent, styleable dropdown. Emits change events shaped like a native
 * input's onChange (event.target.name/value) so it drops into existing form
 * handlers unchanged. Pass `searchable` to add a filter input above the
 * option list (used for the long country list).
 */
function CustomSelect({
  id,
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  searchable = false,
  error,
  required = false,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);
  const searchRef = useRef(null);

  const selected = options.find((o) => o.value === value);
  const filtered =
    searchable && query.trim()
      ? options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()))
      : options;

  useEffect(() => {
    function onDocClick(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    if (open && searchable) searchRef.current?.focus();
  }, [open, searchable]);

  const commit = (val) => {
    onChange({ target: { name, value: val } });
    setOpen(false);
    setQuery('');
  };

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const openList = () => {
    setOpen(true);
    setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
  };

  const onTriggerClick = () => {
    if (open) close();
    else openList();
  };

  const onTriggerKeyDown = (event) => {
    if (!open && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      openList();
    } else if (event.key === 'Escape') {
      close();
    }
  };

  const onListKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (filtered[activeIndex]) commit(filtered[activeIndex].value);
    } else if (event.key === 'Escape') {
      close();
    }
  };

  return (
    <div className="custom-select" ref={rootRef}>
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <button
        type="button"
        id={id}
        className={`custom-select__trigger ${open ? 'is-open' : ''} ${error ? 'has-error' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={onTriggerClick}
        onKeyDown={onTriggerKeyDown}
      >
        <span className={selected ? '' : 'custom-select__placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={16} className="custom-select__chevron" aria-hidden="true" />
      </button>

      {open && (
        <div className="custom-select__list" role="listbox">
          {searchable && (
            <input
              ref={searchRef}
              type="text"
              className="custom-select__search"
              placeholder="Search countries…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onListKeyDown}
            />
          )}
          <ul className="custom-select__options" tabIndex={-1} onKeyDown={onListKeyDown}>
            {filtered.length === 0 && <li className="custom-select__empty">No matches found</li>}
            {filtered.map((opt, i) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                className={`custom-select__option ${i === activeIndex ? 'is-active' : ''} ${
                  opt.value === value ? 'is-selected' : ''
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => commit(opt.value)}
              >
                <span>{opt.label}</span>
                {opt.value === value && <Check size={14} aria-hidden="true" />}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && (
        <span className="custom-select__error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export default CustomSelect;
