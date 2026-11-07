import {
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type FormEventHandler,
  type KeyboardEvent,
} from 'react';
import { defaultRangeExtractor } from '@tanstack/react-virtual';
import { ChevronDown } from 'lucide-react';
import { useVirtualizedList } from '../VirtualizedList/useVirtualizedList';

export type VirtualizedDropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type VirtualizedDropdownProps = Omit<
  ComponentPropsWithRef<'button'>,
  | 'children'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'onInvalid'
  | 'type'
  | 'role'
  | 'aria-expanded'
  | 'aria-controls'
  | 'aria-activedescendant'
  | 'aria-haspopup'
> & {
  options: readonly VirtualizedDropdownOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  required?: boolean;
  onInvalid?: FormEventHandler<HTMLSelectElement>;
  /** Maximum popup height in pixels. */
  height?: number;
  /** Fixed, single-line option height in pixels. */
  optionHeight?: number;
  overscan?: number;
};

const triggerStyles =
  'flex w-full min-w-0 items-center justify-between gap-ui-2 rounded-ui-md border border-ui-border bg-ui-surface px-ui-3 py-ui-2 text-start font-ui-sans text-base leading-normal text-ui-text focus-visible:border-ui-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus disabled:cursor-not-allowed disabled:border-ui-border disabled:bg-ui-disabled disabled:text-ui-on-disabled aria-invalid:border-ui-error aria-invalid:focus-visible:ring-ui-error';

type OptionListProps = {
  id: string;
  labelledBy: string;
  options: readonly VirtualizedDropdownOption[];
  activeIndex: number;
  selectedValue: string;
  height: number;
  optionHeight: number;
  overscan: number;
  emptyMessage: string;
  onSelect: (index: number) => void;
};

function OptionList({
  id,
  labelledBy,
  options,
  activeIndex,
  selectedValue,
  height,
  optionHeight,
  overscan,
  emptyMessage,
  onSelect,
}: OptionListProps) {
  const getItemKey = useCallback((index: number) => options[index].value, [options]);
  const rangeExtractor = useCallback(
    (range: Parameters<typeof defaultRangeExtractor>[0]) => {
      const indexes = defaultRangeExtractor(range);
      // Keep the aria-activedescendant target mounted even during pointer scrolling.
      if (activeIndex >= 0 && !indexes.includes(activeIndex)) {
        indexes.push(activeIndex);
        indexes.sort((a, b) => a - b);
      }
      return indexes;
    },
    [activeIndex],
  );
  const { scrollElementRef, virtualizer } = useVirtualizedList({
    count: options.length,
    estimateSize: optionHeight,
    overscan,
    getItemKey,
    rangeExtractor,
    initialRect: { width: 0, height },
  });

  useLayoutEffect(() => {
    if (activeIndex >= 0) virtualizer.scrollToIndex(activeIndex, { align: 'auto' });
  }, [activeIndex, virtualizer]);

  return (
    <>
      <div
        ref={scrollElementRef}
        id={id}
        role="listbox"
        aria-labelledby={labelledBy}
        className="overflow-auto overscroll-contain"
        style={{ height: options.length ? Math.min(height, options.length * optionHeight) : 0 }}
        onMouseDown={(event) => event.preventDefault()}
      >
        <div
          role="presentation"
          style={{ height: virtualizer.getTotalSize(), position: 'relative', width: '100%' }}
        >
          {virtualizer.getVirtualItems().map((row) => {
            const option = options[row.index];
            return (
              <div
                id={`${id}-option-${encodeURIComponent(option.value)}`}
                key={row.key}
                role="option"
                aria-selected={option.value === selectedValue}
                aria-disabled={option.disabled || undefined}
                aria-posinset={row.index + 1}
                aria-setsize={options.length}
                data-active={row.index === activeIndex || undefined}
                className="flex cursor-pointer items-center truncate px-ui-3 text-ui-text hover:bg-ui-surface-muted aria-selected:font-semibold aria-disabled:cursor-not-allowed aria-disabled:text-ui-on-disabled aria-disabled:hover:bg-transparent data-active:bg-ui-action data-active:text-ui-on-action"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: row.size,
                  transform: `translateY(${row.start}px)`,
                }}
                onClick={() => onSelect(row.index)}
                title={option.label}
              >
                <span className="truncate">{option.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      {options.length === 0 && (
        <p role="status" className="m-0 px-ui-3 py-ui-2 text-ui-text-muted">
          {emptyMessage}
        </p>
      )}
    </>
  );
}

export function VirtualizedDropdown({
  options,
  value,
  defaultValue = '',
  onValueChange,
  placeholder = 'Choose an option',
  emptyMessage = 'No options available',
  required,
  onInvalid,
  height = 240,
  optionHeight = 40,
  overscan = 5,
  id,
  ref,
  name,
  form,
  disabled,
  className = '',
  onClick,
  onKeyDown,
  onBlur,
  'aria-invalid': ariaInvalid,
  'aria-describedby': describedBy,
  ...props
}: VirtualizedDropdownProps) {
  const generatedId = useId();
  const triggerId = id ?? generatedId;
  const listId = `${triggerId}-listbox`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const formControlRef = useRef<HTMLSelectElement>(null);
  const typeahead = useRef({ text: '', time: 0 });
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [menu, setMenu] = useState<{ activeValue: string | null } | null>(null);
  const [validationMessage, setValidationMessage] = useState('');
  const [placement, setPlacement] = useState({ above: false, height });
  const optionIndices = useMemo(
    () => new Map(options.map((option, index) => [option.value, index])),
    [options],
  );
  const selectedIndex = optionIndices.get(value ?? internalValue) ?? -1;
  const selectedOption = options[selectedIndex];
  const selectedValue = selectedOption?.value ?? '';
  const errorMessage = selectedValue === '' ? validationMessage : '';
  const open = menu !== null && !disabled;
  if (disabled && menu !== null) setMenu(null);
  const firstEnabled = options.findIndex((option) => !option.disabled);
  const candidateIndex =
    menu?.activeValue == null ? -1 : (optionIndices.get(menu.activeValue) ?? -1);
  const activeIndex =
    candidateIndex >= 0 && !options[candidateIndex].disabled
      ? candidateIndex
      : selectedIndex >= 0 && !selectedOption.disabled
        ? selectedIndex
        : firstEnabled;
  const rowHeight = Math.max(1, optionHeight);
  const popupHeight = Math.max(1, height);

  useImperativeHandle(ref, () => triggerRef.current!);

  const close = useCallback(() => {
    setMenu(null);
    typeahead.current = { text: '', time: 0 };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) close();
    };
    document.addEventListener('pointerdown', onOutsidePointer);
    return () => document.removeEventListener('pointerdown', onOutsidePointer);
  }, [open, close]);

  useEffect(() => {
    const owner = formControlRef.current?.form;
    if (!owner) return;
    const onReset = (event: Event) => {
      // Other reset handlers may cancel the native action.
      queueMicrotask(() => {
        if (event.defaultPrevented) return;
        if (value === undefined) setInternalValue(defaultValue);
        if (formControlRef.current) formControlRef.current.value = value ?? defaultValue;
        setValidationMessage('');
        close();
      });
    };
    owner.addEventListener('reset', onReset);
    return () => owner.removeEventListener('reset', onReset);
  }, [form, value, defaultValue, close]);

  useLayoutEffect(() => {
    if (!open) return;
    const updatePlacement = () => {
      const bounds = triggerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const below = Math.max(1, window.innerHeight - bounds.bottom - 8);
      const above = Math.max(1, bounds.top - 8);
      const desired = Math.min(popupHeight, Math.max(1, options.length) * rowHeight);
      const showAbove = below < desired && above > below;
      const availableHeight = Math.min(popupHeight, showAbove ? above : below);
      setPlacement((previous) =>
        previous.above === showAbove && previous.height === availableHeight
          ? previous
          : { above: showAbove, height: availableHeight },
      );
    };
    updatePlacement();
    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);
    return () => {
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
    };
  }, [open, popupHeight, options.length, rowHeight]);

  function select(index: number) {
    const option = options[index];
    if (triggerRef.current?.matches(':disabled') || !option || option.disabled) return;
    if (value === undefined) setInternalValue(option.value);
    if (option.value !== selectedValue) onValueChange?.(option.value);
    setValidationMessage('');
    close();
  }

  function activate(index: number) {
    setMenu({ activeValue: options[index]?.value ?? null });
  }

  function boundary(direction: 1 | -1) {
    for (
      let index = direction === 1 ? 0 : options.length - 1;
      index >= 0 && index < options.length;
      index += direction
    ) {
      if (!options[index].disabled) return index;
    }
    return -1;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      triggerRef.current?.matches(':disabled')
    )
      return;

    if (event.key === 'Escape') {
      if (open) {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
      return;
    }
    if (event.key === 'Tab') {
      if (open) {
        select(activeIndex);
        close();
      }
      return;
    }
    if (event.altKey && event.key === 'ArrowUp' && open) {
      event.preventDefault();
      select(activeIndex);
      close();
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) {
      if (!(event.altKey && event.key === 'ArrowDown')) return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (open) {
        select(activeIndex);
        close();
      } else activate(activeIndex);
      return;
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      activate(boundary(event.key === 'Home' ? 1 : -1));
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        activate(activeIndex);
        return;
      }
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      for (
        let index = activeIndex + direction;
        index >= 0 && index < options.length;
        index += direction
      ) {
        if (!options[index].disabled) {
          activate(index);
          return;
        }
      }
      return;
    }
    if (event.key.length !== 1) return;
    event.preventDefault();
    const time = Date.now();
    const previous = typeahead.current;
    const text = (time - previous.time < 700 ? previous.text : '') + event.key.toLocaleLowerCase();
    typeahead.current = { text, time };
    const repeated = Array.from(text).every((character) => character === text[0]);
    const search = repeated ? text[0] : text;
    const start = open ? activeIndex : selectedIndex;
    const startIndex = Math.max(0, repeated ? start + 1 : start);
    for (let offset = 0; offset < options.length; offset++) {
      const index = (startIndex + offset) % options.length;
      if (!options[index].disabled && options[index].label.toLocaleLowerCase().startsWith(search)) {
        activate(index);
        return;
      }
    }
    if (!open) activate(activeIndex);
  }

  return (
    <div ref={rootRef} className="relative min-w-0">
      <button
        {...props}
        ref={triggerRef}
        id={triggerId}
        type="button"
        form={form}
        disabled={disabled}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={
          open && activeIndex >= 0
            ? `${listId}-option-${encodeURIComponent(options[activeIndex].value)}`
            : undefined
        }
        aria-required={required || undefined}
        aria-invalid={errorMessage ? true : ariaInvalid}
        aria-describedby={
          [describedBy, errorMessage ? `${triggerId}-error` : ''].filter(Boolean).join(' ') ||
          undefined
        }
        className={`${triggerStyles} ${className}`.trim()}
        onKeyDown={handleKeyDown}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented || event.currentTarget.matches(':disabled')) return;
          if (open) close();
          else activate(activeIndex);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (!rootRef.current?.contains(event.relatedTarget)) close();
        }}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>
        <ChevronDown size={18} aria-hidden="true" className="shrink-0" />
      </button>
      <select
        ref={formControlRef}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        name={name}
        form={form}
        disabled={disabled}
        required={required}
        value={selectedValue}
        onChange={() => {}}
        onInvalid={(event) => {
          event.preventDefault();
          setValidationMessage(event.currentTarget.validationMessage);
          triggerRef.current?.focus();
          onInvalid?.(event);
        }}
      >
        <option value="" />
        {selectedValue !== '' && <option value={selectedValue}>{selectedOption?.label}</option>}
      </select>
      {errorMessage && (
        <p id={`${triggerId}-error`} className="mt-ui-2 text-sm text-ui-error">
          {errorMessage}
        </p>
      )}
      {open && (
        <div
          className={`absolute inset-x-0 z-50 overflow-hidden rounded-ui-md border border-ui-border bg-ui-surface text-ui-text shadow-ui-card ${placement.above ? 'bottom-full mb-ui-1' : 'top-full mt-ui-1'}`}
        >
          <OptionList
            id={listId}
            labelledBy={props['aria-labelledby'] ?? triggerId}
            options={options}
            activeIndex={activeIndex}
            selectedValue={selectedValue}
            height={placement.height}
            optionHeight={rowHeight}
            overscan={Math.max(0, overscan)}
            emptyMessage={emptyMessage}
            onSelect={(index) => {
              select(index);
              triggerRef.current?.focus();
            }}
          />
        </div>
      )}
    </div>
  );
}
